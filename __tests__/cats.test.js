const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/cats returns a list of cats', async () => {
    const res = await request(app).get('/cats');
    const cats = await Cat.getAllCats();
    const expected = cats.map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        favorite_food: cat.favorite_food,
        age: cat.age,
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
