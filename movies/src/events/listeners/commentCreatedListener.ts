import { Listener, CommentCreatedEvent, Subjects } from '@morfit/common';
import { MovieUpdatedPublisher } from '../publishers/movieUpdatedPublisher';
import { Movie } from '../../models/movie';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentCreatedEvent['data'], msg: Message) {
    // Find movie that the comment is reserving
    const movie = await Movie.findById(data.movie.id);

    // If no movie, throw error
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Mark the movie as being reserved by setting its commentId property
    movie.set({ commentId: data.id });

    // Save the movie
    await movie.save();

    // Once there has been a change to data we need to emit an event
    await new MovieUpdatedPublisher(this.client).publish({
      id: movie.id,
      version: movie.version,
      title: movie.title,
      workout: movie.workout,
      userId: movie.userId,
      commentId: movie.commentId,
    });

    // ack the message
    msg.ack();
  }
}
