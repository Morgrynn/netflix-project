import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


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
  await request(app).delete(`/api/movies/${movieId}`).expect(401);
});

// test('returns status 400 if video not owned by user', async () => {
//   const resp = await postMovie();

//   await request(app)
//     .delete(`/api/movies/${resp.body.id}`)
//     .set('Cookie', global.admin())
//     .expect(400);
// });

test('valid delete returns status 200', async () => {
  const cookie = global.admin();
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

  const response = await request(app)
    .delete(`/api/movies/${resp.body.id}`)
    .set('Cookie', cookie)
    .expect(200);


  expect(response.body).toEqual("The movie has been deleted...");
});
