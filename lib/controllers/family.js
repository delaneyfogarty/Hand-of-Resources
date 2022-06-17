const { Router } = require('express');
const Family = require('../models/Family');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const allFamily = await Family.getAllFamilyMembers();
    res.json(allFamily);
  } catch (e) {
    next(e);
  }
});
