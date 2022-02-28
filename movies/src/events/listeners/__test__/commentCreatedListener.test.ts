import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { CommentCreatedEvent, CommentStatus } from '@morfit/common';
import { CommentCreatedListener } from '../commentCreatedListener';
import { natsClient } from '../../../natsClient';
import { Movie } from '../../../models/movie';

const setup = async () => {
  // Create an instance of the listener
  const listener = new CommentCreatedListener(natsClient.client);

  //   Create and save a movie
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
  await movie.save();

  // Create the fake data event
  const data: CommentCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: CommentStatus.Created,
    content: 'comments',
    userId: 'asdf',
    expiresAt: 'asdf',
    movie: {
      id: movie.id,
      title: movie.title,
    },
  };

  // Create fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, movie, data, msg };
};

it('sets the userId of the movie', async () => {
  const { listener, movie, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedMovie = await Movie.findById(movie.id);

  expect(updatedMovie!.commentId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a movie updated event', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsClient.client.publish).toHaveBeenCalled();

  
  const movieUpdatedData = JSON.parse((natsClient.client.publish as jest.Mock).mock.calls[0][1]);


  expect(data.id).toEqual(movieUpdatedData.commentId)
});
