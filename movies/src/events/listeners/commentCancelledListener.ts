import { Listener, CommentCancelledEvent, Subjects } from '@morfit/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Movie } from '../../models/movie';
import { MovieUpdatedPublisher } from '../publishers/movieUpdatedPublisher';

export class CommentCancelledListener extends Listener<CommentCancelledEvent> {
  subject: Subjects.CommentCancelled = Subjects.CommentCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentCancelledEvent['data'], msg: Message) {
    // Find the movie that the order is cancelling
    const movie = await Movie.findById(data.movie.id);

    // If no movie, throw error
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Mark the movie as NOT reserved by setting its commentId to undefined
    movie.set({ commentId: undefined });

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
