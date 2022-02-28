import request from 'supertest';
import { app } from '../../app';

test('should return 201 statusCode on register', async () => {
  return request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: 'password',
    })
    .expect(201);
});

test('invalid email returns statusCode 400', async () => {
  return request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobitest.com',
      password: 'password',
    })
    .expect(400);
});

test('invalid password returns statusCode 400', async () => {
  return request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: '1',
    })
    .expect(400);
});

test('missing email or password returns statusCode 400', async () => {
  return request(app).post('/api/users/register').send({}).expect(400);
});

test('prevents duplicate emails', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: 'password',
    })
    .expect(400);
});

test('cookie is set after registering', async () => {
  const response = await request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: 'password',
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
