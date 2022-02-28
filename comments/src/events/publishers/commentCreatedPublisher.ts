import { Publisher, CommentCreatedEvent, Subjects } from "@morfit/common";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated
}