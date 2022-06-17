const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Family = require('../lib/models/Family');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/family returns a list of family members', async () => {
    const res = await request(app).get('/family');
    const family = await Family.getAllFamilyMembers();
    const expected = family.map((member) => {
      return {
        id: member.id,
        name: member.name,
        gender: member.gender,
        relationship: member.relationship,
        age: member.age,
      };
    });
    expect(res.body).toEqual(expected);
  });

  it('/family/:id returns one family member', async () => {
    const res = await request(app).get('/family/11');
    const juliet = {
      id: '11',
      name: 'Juliet',
      gender: 'Female',
      relationship: 'Aunt',
      age: 38,
    };
    expect(res.body).toEqual(juliet);
  });

  it('add a new family member', async () => {
    const xtina = new Family({
      id: '17',
      name: 'Xtina',
      gender: 'Female',
      relationship: 'Bestie',
      age: 36,
    });
    const res = await request(app).post('/family').send(xtina);
    expect(res.body.id).toEqual(xtina.id);
    expect(res.body.name).toEqual(xtina.name);
    expect(res.body.gender).toEqual(xtina.gender);
    expect(res.body.relationship).toEqual(xtina.relationship);
    expect(res.body.age).toEqual(xtina.age);
  });

  it('PUT /family/:id should update a family member', async () => {
    const res = await request(app).put('/family/2').send({ age: 18 });
    expect(res.body.age).toEqual(18);
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
