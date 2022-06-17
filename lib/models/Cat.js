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

  static async getSingleCat(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE cats.id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Cat(rows[0]);
  }

  static async addCat({ name, color, favorite_food, age }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, color, favorite_food, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, color, favorite_food, age]
    );
    return new Cat(rows[0]);
  }
};
