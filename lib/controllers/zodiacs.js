const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newZodiac = await Zodiac.createZodiac(req.body);
      res.json(newZodiac);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const singleZodiac = await Zodiac.getSingleZodiac(req.params.id);
    res.json(singleZodiac);
  })
  .get('/', async (req, res) => {
    const allZodiacs = await Zodiac.getAllZodiacs();
    res.json(allZodiacs);
  });
