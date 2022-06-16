const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Gemstone = require('../lib/models/Gemstone');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should create a new gemstone', async () => {
    const newGemstone = {
      id: '5',
      name: 'Ruby',
      properties: 'Energy, Concentration, Creativity',
      birth_stone: true,
    };
    const res = await request(app).post('/gemstones').send(newGemstone);
    expect(res.body.name).toEqual(newGemstone.name);
    expect(res.body.properties).toEqual(newGemstone.properties);
    expect(res.body.birth_stone).toEqual(newGemstone.birth_stone);
  });

  it('/gemstones/:id should return one gemstone', async () => {
    const res = await request(app).get('/gemstones/2');
    const citrine = await Gemstone.getSingleGemstone(2);
    expect(res.body).toEqual(citrine);
  });

  it('/gemstones should return a list of gemstones', async () => {
    const res = await request(app).get('/gemstones');
    const allGemstones = await Gemstone.getAllGemstones();
    const expected = allGemstones.map((gemstone) => {
      return {
        id: gemstone.id,
        name: gemstone.name,
        properties: gemstone.properties,
        birth_stone: gemstone.birth_stone,
      };
    });
    expect(res.body).toEqual(expected);
  });

  it('/gemstones/:id should update a gemstone', async () => {});

  afterAll(() => {
    pool.end();
  });
});
