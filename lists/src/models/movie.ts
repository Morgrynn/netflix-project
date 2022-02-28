import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { List, ListStatus } from './list';

interface MovieAttrs {
  title: string;
  workout: string;
}

export interface MovieDoc extends mongoose.Document {
  title: string;
  workout: string;
  version: number;
  isReserved(): Promise<boolean>;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
  build(attrs: MovieAttrs): MovieDoc;
}

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    workout: {
      type: String,
      required: true,
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

movieSchema.set('versionKey', 'version');
movieSchema.plugin(updateIfCurrentPlugin);

movieSchema.statics.build = (attrs: MovieAttrs) => {
  return new Movie(attrs);
};

// Run query to look at all orders. Find an order where the ticket
// is the ticket we just found and the orders status is not cancelled
// If we find an order from this that means the ticket is reserved
movieSchema.methods.isReserved = async function () {
  // this === the movie document that we just called 'isReserved' on
  const existingOrder = await List.findOne({
    movie: this,
    status: {
      $in: [ListStatus.Created, ListStatus.Complete],
    },
  });

  return !!existingOrder;
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);

export { Movie };
