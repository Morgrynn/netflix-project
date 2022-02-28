import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { CommentCancelledEvent } from '@morfit/common';
import { CommentCancelledListener } from '../commentCancelledListener';
import { natsClient } from '../../../natsClient';
import { Movie } from '../../../models/movie';

const setup = async () => {
  // Create an instance of the listener
  const listener = new CommentCancelledListener(natsClient.client);

  //   Create and save a movie
  const commentId = new mongoose.Types.ObjectId().toHexString();
  const movie = Movie.build({
    title: 'title',
    workout: 'workout',
    desc: "desc",
    img: 'img',
    trailer: 'trailer',
    thumbnail: 'thumbnail',
    imgTitle: 'imgTitle',
    video: 'video',
    year: 'year',
    userId: 'asdf',
  });
  movie.set({ commentId });
  await movie.save();

  // Create the fake data event
  const data: CommentCancelledEvent['data'] = {
    id: commentId,
    version: 0,
    movie: {
      id: movie.id,
    },
  };

  // Create fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, movie, commentId, data, msg };
};

it('updates the movie, publishes an event, and acks the message', async () => {
  const { listener, movie, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedMovie = await Movie.findById(movie.id);

  expect(updatedMovie!.commentId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsClient.client.publish).toHaveBeenCalled();
});
