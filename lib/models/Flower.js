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

  static async addFlower({ name, color }) {
    const { rows } = await pool.query(
      'INSERT INTO flowers (name, color) VALUES ($1, $2) RETURNING *',
      [name, color]
    );
    return new Flower(rows[0]);
  }

  static async updateFlower(id, attrs) {
    const flower = await Flower.getSingleFlower(id);
    if (!flower) return null;
    const { name, color } = { ...flower, ...attrs };
    const { rows } = await pool.query(
      `UPDATE flowers
        SET name=$2, color=$3
        WHERE id=$1 RETURNING *`,
      [id, name, color]
    );
    return new Flower(rows[0]);
  }
};
