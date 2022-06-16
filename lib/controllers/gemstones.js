const { Router } = require('express');
const Gemstone = require('../models/Gemstone');

module.exports = Router().get('/', async (req, res) => {
  const allGemstones = await Gemstone.getAllGemstones();
  res.json(allGemstones);
});
