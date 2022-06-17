const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router().get('/', async (req, res) => {
  const allCats = await Cat.getAllCats();
  res.json(allCats);
});
