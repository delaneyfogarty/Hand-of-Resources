const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const singleZodiac = await Zodiac.getSingleZodiac(req.params.id);
    res.json(singleZodiac);
  })
  .get('/', async (req, res) => {
    const allZodiacs = await Zodiac.getAllZodiacs();
    res.json(allZodiacs);
  });
