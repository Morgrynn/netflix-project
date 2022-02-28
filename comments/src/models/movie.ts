import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Comment, CommentStatus } from './comment';

interface MovieAttrs {
  id: string;
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
    findByEvent(event: { id: string; version: number }): Promise<MovieDoc | null>;
  }
  
  const movieSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      workout: {
        type: String,
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
  
  movieSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Movie.findOne({
      _id: event.id,
      version: event.version - 1,
    });
  };
  movieSchema.statics.build = (attrs: MovieAttrs) => {
    return new Movie({
      _id: attrs.id,
      title: attrs.title,
      workout: attrs.workout,
    });
  };
  
  // Run query to look at all comments. Find an comment where the movie
  // is the movie we just found and the comments status is not cancelled
  // If we find an comment from this that means the movie is reserved
  movieSchema.methods.isReserved = async function () {
    // this === the movie document that we just called 'isReserved' on
    const existingComment = await Comment.findOne({
      movie: this,
      status: {
        $in: [
          CommentStatus.Created,
          CommentStatus.AwaitingModeration,
          CommentStatus.Complete,
        ],
      },
    });
  
    return !!existingComment;
  };
  
  const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);
  
  export { Movie };