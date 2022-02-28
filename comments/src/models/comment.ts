import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { CommentStatus } from '@morfit/common';
import { MovieDoc } from './movie';

export { CommentStatus };

interface CommentAttrs {
  userId: string;
  content: string;
  expiresAt: Date;
  status: CommentStatus;
  movie: MovieDoc;
}

interface CommentDoc extends mongoose.Document {
  userId: string;
  content?: string;
  expiresAt: Date;
  status: CommentStatus;
  movie: MovieDoc;
  version: number;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CommentStatus),
      default: CommentStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
commentSchema.set('versionKey', 'version');
commentSchema.plugin(updateIfCurrentPlugin);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
