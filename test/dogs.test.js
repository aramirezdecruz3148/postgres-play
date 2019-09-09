require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/utils/client');
const child_process = require('child_process');

describe('dog routes', () => {
 
  beforeEach(() => {
    child_process.execFileSync('npm run recreate-tables');
  });

  afterAll(() => {
    client.end();
  });

  const TEST_DOG = {
    name: 'Pennington',
    age: 8,
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
      age: 8,
      breed: 'Mixed',
      isCertified: false,
    });
  };

  it('creates a dog', () => {
    return createDog()
      .then(({ body }) => {
        testDog(body);
      });
  });
});
