import mongoose from 'mongoose';
import { app } from './app';
import { natsClient } from './natsClient';
import { CommentCancelledListener } from './events/listeners/commentCancelledListener';
import { CommentCreatedListener } from './events/listeners/commentCreatedListener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  try {
    await natsClient.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsClient.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsClient.client.close());
    process.on('SIGTERM', () => natsClient.client.close());

    new CommentCreatedListener(natsClient.client).listen();
    new CommentCancelledListener(natsClient.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Movies: Connected to MongoDB');
  } catch (err) {
    console.error('Error', err);
  }

  app.listen(3000, () => {
    console.log('Movies: Listening on port 3000');
  });
};

start();
