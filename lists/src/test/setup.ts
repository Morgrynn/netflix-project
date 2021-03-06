import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  function register(): string[];
  function admin(): string[];
}

jest.mock('../natsClient.ts');
jest.setTimeout(30000);

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'somekey';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.register = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'anakin@mail.com',
    role: 'USER',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};

global.admin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'anakin@mail.com',
    role: 'ADMIN',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
