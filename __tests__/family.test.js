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

  afterAll(() => {
    pool.end();
  });
});
