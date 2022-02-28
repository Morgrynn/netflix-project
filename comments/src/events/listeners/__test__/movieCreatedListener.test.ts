import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { MovieCreatedEvent } from '@morfit/common';
import { MovieCreatedListener } from '../movieCreatedListener';
import { natsClient } from '../../../natsClient';
import { Movie } from '../../../models/movie';

const setup = async () => {
  const listener = new MovieCreatedListener(natsClient.client);

  const data: MovieCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'title',
    workout: 'workout',
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a movie', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const movie = await Movie.findById(data.id);

  expect(movie).toBeDefined();
  expect(movie!.title).toEqual(data.title);
  expect(movie!.workout).toEqual(data.workout);
});

it('acks the message', async () => {
  const { data, listener, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
