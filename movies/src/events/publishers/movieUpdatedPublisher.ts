import { Publisher, Subjects, MovieUpdatedEvent } from '@morfit/common';

export class MovieUpdatedPublisher extends Publisher<MovieUpdatedEvent> {
  subject: Subjects.MovieUpdated = Subjects.MovieUpdated;
}