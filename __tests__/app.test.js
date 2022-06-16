const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/Flower');

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

  it('/flowers/:id returns one specific flower', async () => {
    const res = await request(app).get('/flowers/1');
    const rose = {
      id: '1',
      name: 'Rose',
      color: 'Red',
    };
    expect(res.body).toEqual(rose);
  });

  it('should add a new flower', async () => {
    const newFlower = new Flower({
      id: '6',
      name: 'Tulip',
      color: 'Yellow',
    });
    const res = await request(app).post('/flowers').send(newFlower);
    expect(res.body.id).toEqual(newFlower.id);
    expect(res.body.name).toEqual(newFlower.name);
    expect(res.body.color).toEqual(newFlower.color);
  });

  afterAll(() => {
    pool.end();
  });
});
