import request from 'supertest';
import { app } from '../../app';

test('invalid email supplied', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

test('invalid password supplied', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@test.com',
      password: 'asödlfkjaödlfkj',
    })
    .expect(400);
});

test('cookie response', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const resp = await request(app)
    .post('/api/users/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  expect(resp.get('Set-Cookie')).toBeDefined();
});
