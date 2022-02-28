import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Movie } from '../../models/movie';

test('fetches the comment', async () => {
  // Create a movie
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Lower Focus',
    workout: 'Legs',
  });
  await movie.save();

  const user = global.register();
  // make a request to build an comment with this movie
  const { body: commentOne } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ movieId: movie.id, content: 'comment' })
    .expect(201);

  // make request to fetch the comment
  const { body: fetchComment } = await request(app)
    .get(`/api/comments/${commentOne.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchComment.id).toEqual(commentOne.id);
});


test(' for error if one user tries to fetch anothers comment', async () => {
  // Create a movie
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Lower Focus',
    workout: 'Legs',
  });
  await movie.save();

  const user = global.register();
  // make a request to build an comment with thid movie
  const { body: comment } = await request(app)
    .post('/api/comments')
    .set('Cookie', user)
    .send({ movieId: movie.id, content: 'comments' })
    .expect(201);

  // make request to fetch the comment
  await request(app)
    .get(`/api/comments/${comment.id}`)
    .set('Cookie', global.register())
    .send()
    .expect(401);

});
