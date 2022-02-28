import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// declare global {
//  namespace NodeJS {
//      interface Global {
//          var register: () => string[]
//      }
//  }
// }

declare global {
  function register(): Promise<string[]>;
}

jest.setTimeout(30000);

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'somekey';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.register = async () => {
  const email = 'kenobi@test.com';
  const password = 'password';
  const role = 'USER'

  const resp = await request(app)
    .post('/api/users/register')
    .send({
      email,
      password,
      role
    })
    .expect(201);

  const cookie = resp.get('Set-Cookie');

  return cookie;
};
