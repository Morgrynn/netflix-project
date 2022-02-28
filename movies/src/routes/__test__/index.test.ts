import request from 'supertest';
import { app } from '../../app';


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

test('can get all movies', async () => {
  const cookie = global.register();
  await postMovie();
  await postMovie();

  const resp = await request(app).get('/api/movies').set('Cookie', cookie).send().expect(200);
  expect(resp.body.length).toEqual(2);
});
