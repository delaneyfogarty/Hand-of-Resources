const { Router } = require('express');
const Zodiac = require('../models/Zodiac');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedZodiac = await Zodiac.deleteZodiac(id);
      res.json(deletedZodiac);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedZodiac = await Zodiac.updateZodiac(id, req.body);
      res.json(updatedZodiac);
    } catch (e) {
      next(e);
    }
  })
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
