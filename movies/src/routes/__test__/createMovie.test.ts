import request from 'supertest';
import { app } from '../../app';
import { Movie } from '../../models/movie';
import { natsClient } from '../../natsClient';

test('route for /api/movies for post request', async () => {
  const response = await request(app).post('/api/movies').send({});
  expect(response.status).not.toEqual(404);
});

test('access by logged in user', async () => {
  await request(app).post('/api/movies').send({}).expect(401);
});

test('status code is not 401 for logged in user', async () => {
  const response = await request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({});
  expect(response.status).not.toEqual(401);
});

test('invalid title', async () => {
  await request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({
      title: '',
      desc: 'asdfaf',
      imgTitle: 'asdfaf',
      img: 'asdfaf',
      thumbnail: 'asdfaf',
      trailer: 'asdfaf',
      video: 'asdfaf',
      year: 'asdfaf',
      workout: 'asdfaf',
    })
    .expect(400);

  await request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({
      desc: 'asdfaf',
      imgTitle: 'asdfaf',
      img: 'asdfaf',
      thumbnail: 'asdfaf',
      trailer: 'asdfaf',
      video: 'asdfaf',
      year: 'asdfaf',
      workout: 'asdfaf',
    })
    .expect(400);
});

test('creates media with valid inputs', async () => {
  let movies = await Movie.find({});
  expect(movies.length).toEqual(0);
  await request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({
      title: 'asdfaf',
      desc: 'asdfaf',
      imgTitle: 'asdfaf',
      img: 'asdfaf',
      thumbnail: 'asdfaf',
      trailer: 'asdfaf',
      video: 'asdfaf',
      year: 'asdfaf',
      workout: 'asdfaf',
    })
    .expect(201);

  movies = await Movie.find({});
  expect(movies.length).toEqual(1);
});

test('event is published', async () => {
  await request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({
      title: 'asdfaf',
      desc: 'asdfaf',
      imgTitle: 'asdfaf',
      img: 'asdfaf',
      thumbnail: 'asdfaf',
      trailer: 'asdfaf',
      video: 'asdfaf',
      year: 'asdfaf',
      workout: 'asdfaf',
    })
    .expect(201);

  expect(natsClient.client.publish).toHaveBeenCalled();
});
