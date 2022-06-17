const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

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

  it('/cats/:id returns one specific cat', async () => {
    const res = await request(app).get('/cats/1');
    const boi = {
      id: '1',
      name: 'Boi George',
      color: 'Tuxedo',
      favorite_food: 'Tuna',
      age: 1,
    };
    expect(res.body).toEqual(boi);
  });

  it('add a new cat', async () => {
    const newCat = new Cat({
      id: '7',
      name: 'Butt-head',
      color: 'Tabby',
      favorite_food: 'Squirrel',
      age: 8,
    });
    const res = await request(app).post('/cats').send(newCat);
    expect(res.body.id).toEqual(newCat.id);
    expect(res.body.name).toEqual(newCat.name);
    expect(res.body.color).toEqual(newCat.color);
    expect(res.body.favorite_food).toEqual(newCat.favorite_food);
    expect(res.body.age).toEqual(newCat.age);
  });

  it('PUT /cats/:id should update a cat', async () => {
    const res = await request(app)
      .put('/cats/2')
      .send({ favorite_food: 'Cereal' });
    expect(res.body.favorite_food).toEqual('Cereal');
    expect(res.status).toEqual(200);
  });

  it('DELETE /cat/:id should delete a cat', async () => {
    const res = await request(app).delete('/cats/3');
    expect(res.status).toEqual(200);

    const { body } = await request(app).get('/cats/3');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
