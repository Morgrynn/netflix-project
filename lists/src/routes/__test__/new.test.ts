import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { List, ListStatus } from '../../models/list';
import { Movie } from '../../models/movie';

// const buildMovie = async () => {
//   const movie = Movie.build({
//     title: 'Lower Focus',
//     type: 'T25',
//   });
//   await movie.save();

//   return movie;
// };

it('returns error if the movie does not exist', async () => {
  const movieId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post('/api/lists')
    .set('Cookie', global.register())
    .send({
      movieId,
    })
    .expect(404);
});

it('returns error if the movie is already reserved', async () => {
  const movie = Movie.build({
    title: 'Plyometrics',
    workout: 'p90x',
  });
  await movie.save();
  const list = List.build({
    movie,
    userId: 'asödlfkjasdf',
    title: 'title',
    workout: 'workout type',
    content: ['asdf', 'asdf'],
    status: ListStatus.Created,
    expiresAt: new Date(),
  });
  await movie.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.admin())
    .send({
      movieId: movie.id,
    })
    .expect(400);
});

it('reserves a movie', async () => {
  const movie = Movie.build({
    title: 'Total Body',
    workout: 'p90x',
  });
  await movie.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.admin())
    .send({
      movieId: movie.id,
    })
    .expect(201);
});

it.todo('emits an order created event');
