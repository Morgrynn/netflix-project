import { Message } from 'node-nats-streaming';
import { Subjects, Listener, MovieCreatedEvent } from '@morfit/common';
import { Movie } from '../../models/movie';
import { queueGroupName } from './queueGroupName';

export class MovieCreatedListener extends Listener<MovieCreatedEvent> {
  subject: Subjects.MovieCreated = Subjects.MovieCreated
  queueGroupName = queueGroupName;

  async onMessage(data: MovieCreatedEvent['data'], msg: Message) {
    const { id, title, workout } = data;

    const ticket = Movie.build({
      id,
      title,
      workout,
    });
    await ticket.save();

    msg.ack();
  }
}