const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  color;
  favorite_food;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.favorite_food = row.favorite_food;
    this.age = row.age;
  }

  static async getAllCats() {
    const { rows } = await pool.query('SELECT * FROM cats;');
    return rows.map((row) => new Cat(row));
  }
};
