import { Publisher, CommentCancelledEvent, Subjects } from '@morfit/common';

export class CommentCancelledPublisher extends Publisher<CommentCancelledEvent> {
  subject: Subjects.CommentCancelled = Subjects.CommentCancelled;
}
