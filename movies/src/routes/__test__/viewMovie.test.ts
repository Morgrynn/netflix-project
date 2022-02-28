import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


test('invalid video status 404', async () => {
  const movieId = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/movies/${movieId}`).set('Cookie', global.register()).send().expect(404);
});

test('valid video status 200', async () => {
  const title = 'title';
  const desc = 'desc';
  const imgTitle = 'title';
  const img = 'image';
  const thumbnail = 'thumbnail';
  const trailer = 'trailer';
  const video = 'video';
  const year = 'year';
  const workout = 'workout';
  const resp = await request(app)
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
    })
    .expect(201);
  const response = await request(app)
    .get(`/api/movies/${resp.body.id}`)
    .set('Cookie', global.register())
    .send()
    .expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.desc).toEqual(desc);
  expect(response.body.imgTitle).toEqual(imgTitle);
  expect(response.body.img).toEqual(img);
  expect(response.body.thumbnail).toEqual(thumbnail);
  expect(response.body.trailer).toEqual(trailer);
  expect(response.body.video).toEqual(video);
  expect(response.body.year).toEqual(year);
  expect(response.body.workout).toEqual(workout);
});
