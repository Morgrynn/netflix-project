import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Movie } from '../../models/movie';
import { natsClient } from '../../natsClient';

const title = 'title';
const desc = 'desc';
const imgTitle = 'title';
const img = 'image';
const thumbnail = 'thumbnail';
const trailer = 'trailer';
const video = 'video';
const year = 'year';
const workout = 'workout';

const postMovie = () => {
  return request(app)
    .post('/api/movies')
    .set('Cookie', global.register())
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });
};

test('authentication error returns status 401', async () => {
  const movieId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/movies/${movieId}`)
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    })
    .expect(401);
});

test('invalid update input returns status 400', async () => {
  const cookie = global.register();
  const resp = await request(app)
    .post('/api/movies')
    .set('Cookie', cookie)
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });

  await request(app)
    .put(`/api/movies/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    })
    .expect(400);
});

test('valid update returns status 200', async () => {
  const cookie = global.register();
  const resp = await request(app)
    .post('/api/movies')
    .set('Cookie', cookie)
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });

  await request(app)
    .put(`/api/movies/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    })
    .expect(200);

  const response = await request(app)
    .get(`/api/movies/${resp.body.id}`)
    .set('Cookie', global.register())
    .send();

  expect(response.body.title).toEqual('new title');
});

test('event is published', async () => {
  const cookie = global.register();
  const resp = await request(app)
    .post('/api/movies')
    .set('Cookie', cookie)
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });

  await request(app)
    .put(`/api/movies/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    })
    .expect(200);

  expect(natsClient.client.publish).toHaveBeenCalled();
});

test('rejects updates if the movie is being commented on', async () => {
  const cookie = global.register();
  const resp = await request(app)
    .post('/api/movies')
    .set('Cookie', cookie)
    .send({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });

  const movie = await Movie.findById(resp.body.id);
  movie!.set({ commentId: new mongoose.Types.ObjectId().toHexString() });
  await movie!.save();

  await request(app)
    .put(`/api/movies/${resp.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    })
    .expect(400);
});
