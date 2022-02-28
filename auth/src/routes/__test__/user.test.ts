import request from 'supertest';
import { app } from '../../app';

test('should respond with user details', async () => {
  const cookie = await global.register()

  const resp = await request(app)
    .get('/api/users/user')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(resp.body.currentUser.email).toEqual('kenobi@test.com');
});

test('responds with null if not authenticated', async () => {
    const resp = await request(app)
      .get("/api/users/user")
      .send()
      .expect(200);
  
    expect(resp.body.currentUser).toEqual(null);
  })
