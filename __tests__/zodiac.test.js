const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Zodiac = require('../lib/models/Zodiac');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/zodiacs/:id should return one gemstone', async () => {
    const res = await request(app).get('/zodiacs/9');
    const sag = await Zodiac.getSingleZodiac(9);
    expect(res.body).toEqual(sag);
  });

  it('/zodiacs should return a list of zodiacs', async () => {
    const res = await request(app).get('/zodiacs');
    const allZodiacs = await Zodiac.getAllZodiacs();
    const expected = allZodiacs.map((zodiac) => {
      return {
        id: zodiac.id,
        name: zodiac.name,
        months: zodiac.months,
        birth_stone: zodiac.birth_stone,
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
