import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Movie } from '../../models/movie';
import { Comment, CommentStatus } from '../../models/comment';
import { natsClient } from '../../natsClient';

it('marks an comment as cancelled', async () => {
  // create a movie with movie Model
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'XCore',
    workout: 'Total Body',
  });
  await movie.save();

  const user = global.register();
  // make a request to create an comment
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ movieId: movie.id, content: 'comment' })
    .expect(201);

  // make a request to cancel the comment
  await request(app)
    .delete(`/api/comments/${comment.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedComment = await Comment.findById(comment.id);

  expect(updatedComment!.status).toEqual(CommentStatus.Cancelled);
});

it('emits a comment cancelled event', async () => {
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'XCore',
    workout: 'Total Body',
  });
  await movie.save();

  const user = global.register();
  // make a request to create an comment
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ movieId: movie.id, content: 'comments' })
    .expect(201);

  // make a request to cancel the comment
  await request(app)
    .delete(`/api/comments/${comment.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);
  expect(natsClient.client.publish).toHaveBeenCalled();
});
