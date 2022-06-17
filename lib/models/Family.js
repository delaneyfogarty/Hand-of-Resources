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
};
