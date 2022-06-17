const pool = require('../utils/pool');

module.exports = class Zodiac {
  id;
  name;
  months;
  birth_stone;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.months = row.months;
    this.birth_stone = row.birth_stone;
  }

  static async getAllZodiacs() {
    const { rows } = await pool.query('SELECT * FROM zodiacs;');
    return rows.map((row) => new Zodiac(row));
  }

  static async getSingleZodiac(id) {
    const { rows } = await pool.query(
      'SELECT * FROM zodiacs WHERE zodiacs.id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new Zodiac(rows[0]);
  }

  static async createZodiac({ name, months, birth_stone }) {
    const { rows } = await pool.query(
      'INSERT INTO zodiacs (name, months, birth_stone) VALUES ($1, $2, $3) RETURNING *',
      [name, months, birth_stone]
    );
    return new Zodiac(rows[0]);
  }

  static async updateZodiac(id, attrs) {
    const zodiac = await Zodiac.getSingleZodiac(id);
    if (!zodiac) return null;
    const { name, months, birth_stone } = { ...zodiac, ...attrs };
    const { rows } = await pool.query(
      `UPDATE zodiacs
        SET name=$2, months=$3, birth_stone=$4
        WHERE id=$1 RETURNING *`,
      [id, name, months, birth_stone]
    );
    return new Zodiac(rows[0]);
  }

  static async deleteZodiac(id) {
    const { rows } = await pool.query(
      'DELETE FROM zodiacs WHERE id = $1 RETURNING *',
      [id]
    );
    return new Zodiac(rows[0]);
  }
};
