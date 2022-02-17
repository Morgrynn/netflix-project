import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Auth: Connected to MongoDB');
  } catch (err) {
    console.error('Error', err);
  }

  app.listen(5000, () => {
    console.log('NF-Auth: Listening on port 5000');
  });
};

start();
