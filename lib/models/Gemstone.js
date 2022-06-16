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
};
