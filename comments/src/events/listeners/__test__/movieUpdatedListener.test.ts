import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { MovieUpdatedEvent } from '@morfit/common';
import { MovieUpdatedListener } from '../movieUpdatedListener';
import { natsClient } from '../../../natsClient';
import { Movie } from '../../../models/movie';

const setup = async () => {
  // Create a listener
  const listener = new MovieUpdatedListener(natsClient.client);

  // Create and save a movie
  const movie = Movie.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'title',
    workout: 'workout',
  });
  await movie.save();

  // Create a fake data object
  const data: MovieUpdatedEvent['data'] = {
    id: movie.id,
    version: movie.version + 1,
    title: 'new title',
    workout: 'new workout',
    userId: 'ablskdjf',
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, movie, listener };
};

it('finds, updates, and saves a movie', async () => {
  const { msg, data, movie, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedMovie = await Movie.findById(movie.id);

  expect(updatedMovie!.title).toEqual(data.title);
  expect(updatedMovie!.workout).toEqual(data.workout);
  expect(updatedMovie!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener } = await setup();
  data.version = 10;
  try {
    await listener.onMessage(data, msg);
  } catch (error) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
