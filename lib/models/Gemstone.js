const pool = require('../utils/pool');

module.exports = class Gemstone {
  id;
  name;
  properties;
  birth_stone;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.properties = row.properties;
    this.birth_stone = row.birth_stone;
  }

  static async getAllGemstones() {
    const { rows } = await pool.query('SELECT * FROM gemstones;');
    return rows.map((row) => new Gemstone(row));
  }

  static async getSingleGemstone(id) {
    const { rows } = await pool.query(
      'SELECT id, name, properties, birth_stone FROM gemstones WHERE gemstones.id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new Gemstone(rows[0]);
  }

  static async createGemstone({ name, properties, birth_stone }) {
    const { rows } = await pool.query(
      'INSERT INTO gemstones (name, properties, birth_stone) VALUES ($1, $2, $3) RETURNING *',
      [name, properties, birth_stone]
    );
    return new Gemstone(rows[0]);
  }
};
