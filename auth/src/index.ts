import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Auth: Connected to MongoDB');
  } catch (err) {
    console.error('Error', err);
  }

  app.listen(5000, () => {
    console.log('Auth: Listening on port 5000');
  });
};

start();
