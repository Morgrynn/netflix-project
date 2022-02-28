import request from 'supertest';
import { app } from '../../app';

test('should clear cookie on logging out', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'kenobi@test.com',
      password: 'password',
    })
    .expect(201);
  const resp = await request(app)
    .get('/api/users/logout')
    .send({})
    .expect(200);
  expect(resp.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
