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

  it('PUT /gemstones/:id should update a gemstone', async () => {
    const res = await request(app)
      .put('/gemstones/3')
      .send({ name: 'Emerald' });
    console.log(res);
    expect(res.body.name).toEqual('Emerald');
    expect(res.status).toEqual(200);
  });

  it('DELETE /gemstones/:id should delete a gemstone', async () => {
    const res = await request(app).delete('/gemstones/4');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/gemstones/4');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
