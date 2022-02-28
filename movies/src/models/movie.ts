import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface MovieAttrs {
  title: string;
  desc: string;
  imgTitle: string;
  img: string;
  thumbnail: string;
  trailer: string;
  video: string;
  year: string;
  workout: string;
  userId: string;
}

interface MovieDoc extends mongoose.Document {
  title: string;
  desc: string;
  imgTitle: string;
  img: string;
  thumbnail: string;
  trailer: string;
  video: string;
  year: string;
  workout: string;
  userId: string;
  version: number;
  commentId?: string;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttrs): MovieDoc;
}

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    imgTitle: { type: String },
    img: { type: String },
    thumbnail: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    workout: { type: String },
    userId: { type: String, required: true },
    commentId: { type: String },
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
movieSchema.set('versionKey', 'version');
movieSchema.plugin(updateIfCurrentPlugin);

movieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie(attrs);
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);

export { Movie };
