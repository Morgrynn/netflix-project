import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Comment, CommentStatus } from '../../models/comment';
import { Movie } from '../../models/movie';
import { natsClient } from '../../natsClient';

it('returns error if the movie does not exist', async () => {
  const movieId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.register())
    .send({
      movieId,
      content: 'comment',
    })
    .expect(404);
});

it('returns error if the movie is already reserved', async () => {
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Plyometrics',
    workout: 'Plyo',
  });
  await movie.save();
  const comment = Comment.build({
    movie,
    userId: 'asödlfkjasdf',
    status: CommentStatus.Created,
    expiresAt: new Date(),
    content: 'Some random comment',
  });
  await comment.save();

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.register())
    .send({
      movieId: movie.id,
    })
    .expect(400);
});

it('comment on a movie', async () => {
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Total Body',
    workout: 'Plyo',
  });
  await movie.save();

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.register())
    .send({
      movieId: movie.id,
      content: 'comment',
    })
    .expect(201);
});

it('emits an comment created event', async () => {
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Total Body',
    workout: 'Plyo',
  });
  await movie.save();

  await request(app)
    .post('/api/comments')
    .set('Cookie', global.register())
    .send({
      movieId: movie.id,
      content: 'comment',
    })
    .expect(201);

  expect(natsClient.client.publish).toHaveBeenCalled();
});
