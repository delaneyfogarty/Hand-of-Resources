const pool = require('../utils/pool');

module.exports = class Flower {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async getAllFlowers() {
    const { rows } = await pool.query('SELECT id, name, color FROM flowers;');
    return rows.map((row) => new Flower(row));
  }

  static async getSingleFlower(id) {
    const { rows } = await pool.query(
      'SELECT id, name, color FROM flowers WHERE flowers.id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new Flower(rows[0]);
  }
};
