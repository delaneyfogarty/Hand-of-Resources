const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/flowers returns a list of flowers', async () => {
    const res = await request(app).get('/flowers');
    const flowers = await Flower.getAllFlowers();
    const expected = flowers.map((flower) => {
      return { id: flower.id, name: flower.name, color: flower.color };
    });
    expect(res.body).toEqual(expected);
  });
  afterAll(() => {
    pool.end();
  });
});
