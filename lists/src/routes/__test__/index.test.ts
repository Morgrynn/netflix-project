import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { List, ListStatus } from '../../models/list';
import { Movie } from '../../models/movie';

const buildMovie = async () => {
  const movie = Movie.build({
    title: 'Lower Focus',
    workout: 'T25',
  });
  await movie.save();

  return movie;
};

test('fetches lists for a particular user', async () => {
  // Create three tickets
  const movieOne = await buildMovie();
  const movieTwo = await buildMovie();
  const movieThree = await buildMovie();

  const userOne = global.register();
  const userTwo = global.register();
  // Create one order as User 1
  await request(app)
    .post('/api/lists')
    .set('Cookie', userOne)
    .send({ movieId: movieOne.id })
    .expect(201);
  // Create two orders as User 2
  const { body: listOne } = await request(app)
    .post('/api/lists')
    .set('Cookie', userTwo)
    .send({ movieId: movieTwo.id })
    .expect(201);
  const { body: listTwo } = await request(app)
    .post('/api/list')
    .set('Cookie', userTwo)
    .send({ movieId: movieThree.id })
    .expect(201);
  // Make request to get orders for User 2
  const resp = await request(app)
    .get('/api/lists')
    .set('Cookie', userTwo)
    .send()
    .expect(201);
  // Make sure we only got the Orders for User 2
  //   console.log(resp.body);
  //   console.log(orderOne);
  expect(resp.body.length).toEqual(2);
  expect(resp.body[0].id).toEqual(listOne.id);
  expect(resp.body[1].id).toEqual(listTwo.id);
});
