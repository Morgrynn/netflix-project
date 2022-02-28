import mongoose from 'mongoose';
import { ListStatus } from '@morfit/common';
import { MovieDoc } from './movie';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { ListStatus };

interface ListAttrs {
  userId: string;
  title: string;
  workout: string;
  content: string[];
  status: string;
  expiresAt: Date;
  movie: MovieDoc;
}

interface ListDoc extends mongoose.Document {
  userId: string;
  title: string;
  workout: string;
  content: string[];
  status: string;
  expiresAt: Date;
  version: number;
  movie: MovieDoc;
}

interface ListModel extends mongoose.Model<ListDoc> {
  build(attrs: ListAttrs): ListDoc;
}

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    workout: {
      type: String,
    },
    content: {
      type: Array,
    },
    status: {
      type: String,
      required: true,
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

listSchema.set('versionKey', 'version');
listSchema.plugin(updateIfCurrentPlugin);

listSchema.statics.build = (attrs: ListAttrs) => {
  return new List(attrs);
};

const List = mongoose.model<ListDoc, ListModel>('List', listSchema);

export { List };
