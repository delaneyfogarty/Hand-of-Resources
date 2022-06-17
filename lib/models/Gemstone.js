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

  static async updateGemstone(id, attrs) {
    const gem = await Gemstone.getSingleGemstone(id);
    if (!gem) return null;
    const { name, properties, birth_stone } = { ...gem, ...attrs };
    const { rows } = await pool.query(
      `UPDATE gemstones
        SET name=$2, properties=$3, birth_stone=$4
        WHERE id=$1 RETURNING *`,
      [id, name, properties, birth_stone]
    );
    return new Gemstone(rows[0]);
  }

  static async deleteGemstone(id) {
    const { rows } = await pool.query(
      'DELETE FROM gemstones WHERE id = $1 RETURNING *',
      [id]
    );
    return new Gemstone(rows[0]);
  }
};
