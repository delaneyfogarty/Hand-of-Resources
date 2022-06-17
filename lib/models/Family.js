const pool = require('../utils/pool');

module.exports = class Family {
  id;
  name;
  gender;
  relationship;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.gender = row.gender;
    this.relationship = row.relationship;
    this.age = row.age;
  }

  static async getAllFamilyMembers() {
    const { rows } = await pool.query('SELECT * FROM family;');
    return rows.map((row) => new Family(row));
  }

  static async getSingleFamilyMember(id) {
    const { rows } = await pool.query(
      'SELECT * FROM family WHERE family.id = $1',
      [id]
    );
    if (!rows[0]) return null;
    return new Family(rows[0]);
  }

  static async createFamilyMember({ name, gender, relationship, age }) {
    const { rows } = await pool.query(
      'INSERT INTO family (name, gender, relationship, age) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, gender, relationship, age]
    );
    return new Family(rows[0]);
  }

  static async updateFamilyMember(id, attrs) {
    const family = await Family.getSingleFamilyMember(id);
    if (!family) return null;
    const { name, gender, relationship, age } = { ...family, ...attrs };
    const { rows } = await pool.query(
      `UPDATE family
        SET name=$2, gender=$3, relationship=$4, age=$5
        WHERE id=$1 RETURNING *`,
      [id, name, gender, relationship, age]
    );
    return new Family(rows[0]);
  }

  static async deleteFamilyMember(id) {
    const { rows } = await pool.query(
      'DELETE FROM family WHERE id = $1 RETURNING *',
      [id]
    );
    return new Family(rows[0]);
  }
};
