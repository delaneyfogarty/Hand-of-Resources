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

  it('should add the last zodiac to the table', async () => {
    const pisces = {
      id: '12',
      name: 'Pisces',
      months: 'February 19 - March 20',
      birth_stone: 'Amethyst and Aquamarine',
    };
    const res = await request(app).post('/zodiacs').send(pisces);
    expect(res.body.name).toEqual(pisces.name);
    expect(res.body.months).toEqual(pisces.months);
    expect(res.body.birth_stone).toEqual(pisces.birth_stone);
  });

  afterAll(() => {
    pool.end();
  });
});
