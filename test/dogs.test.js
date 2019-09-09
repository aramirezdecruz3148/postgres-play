require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/utils/client');
const child_process = require('child_process');

describe('dog routes', () => {
 
  beforeEach(() => {
    child_process.execSync('npm run recreate-tables');
  });

  afterAll(() => {
    client.end();
  });

  const TEST_DOG = {
    name: 'Pennington',
    breed: 'Mixed',
    isCertified: false
  };

  const createDog = (dog = TEST_DOG) => request(app)
    .post('/api/v1/dogs')
    .expect(200)
    .send(dog);

  const testDog = dog => {
    expect(dog).toEqual({
      id: expect.any(Number),
      name: 'Pennington',
      breed: 'Mixed',
      is_certified: false,
    });
  };

  it('creates a dog', () => {
    return createDog()
      .then(({ body }) => {
        testDog(body);
      });
  });

  it('gets all dogs', () => {
    return Promise.all([
      createDog({ name: 'Barkley', breed: 'Doodle', is_certified: false }),
      createDog({ name: 'Clementine', breed: 'Great Dane', is_certified: true }),
      createDog({ name: 'Tunes', breed: 'Mutt', is_certified: true })
    ])
      .then(() => {
        return request(app)
          .get('/api/v1/dogs')
          .expect(200)
          .then(({ body }) => {
            expect(body.length).toBe(3);
          });
      });
  });
});
