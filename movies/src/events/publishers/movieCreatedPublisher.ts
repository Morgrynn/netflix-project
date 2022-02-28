import { Publisher, Subjects, MovieCreatedEvent } from '@morfit/common';

export class MovieCreatedPublisher extends Publisher<MovieCreatedEvent> {
  subject: Subjects.MovieCreated = Subjects.MovieCreated;
}
