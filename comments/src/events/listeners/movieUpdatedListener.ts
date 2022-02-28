import { Message } from 'node-nats-streaming';
import { Subjects, Listener, MovieUpdatedEvent } from '@morfit/common';
import { Movie } from '../../models/movie';
import { queueGroupName } from './queueGroupName';

export class MovieUpdatedListener extends Listener<MovieUpdatedEvent> {
  subject: Subjects.MovieUpdated = Subjects.MovieUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: MovieUpdatedEvent['data'], msg: Message) {
    const ticket = await Movie.findByEvent(data);

    if (!ticket) {
      throw new Error('Movie not found');
    }

    const { title, workout } = data;
    ticket.set({ title, workout });
    await ticket.save();

    msg.ack();
  }
}