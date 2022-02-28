import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Movie } from '../../models/movie';

const buildMovie = async () => {
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Body Building',
    workout: 'Chest & Tris',
  });
  await movie.save();

  return movie;
};

it('fetches comments for a particular user', async () => {
  // Create three movies
  const movieOne = await buildMovie();
  const movieTwo = await buildMovie();
  const movieThree = await buildMovie();

  const userOne = global.register();
  const userTwo = global.register();

  // Create one comment as User #1
  await request(app)
    .post('/api/comments')
    .set('Cookie', userOne)
    .send({ movieId: movieOne.id, content: 'comment' })
    .expect(201);

  // Create two comments as User #2
  const { body: commentOne } = await request(app)
    .post('/api/comments')
    .set('Cookie', userTwo)
    .send({ movieId: movieTwo.id, content: 'comment two' })
    .expect(201);
  const { body: commentTwo } = await request(app)
    .post('/api/comments')
    .set('Cookie', userTwo)
    .send({ movieId: movieThree.id, content: 'comment three' })
    .expect(201);

  // Make request to get comments for User #2
  const response = await request(app)
    .get('/api/comments')
    .set('Cookie', userTwo)
    .expect(201);
 
  // Make sure we only got the comments for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(commentOne.id);
  expect(response.body[1].id).toEqual(commentTwo.id);
  expect(response.body[0].movie.id).toEqual(movieTwo.id);
  expect(response.body[1].movie.id).toEqual(movieThree.id);
});
