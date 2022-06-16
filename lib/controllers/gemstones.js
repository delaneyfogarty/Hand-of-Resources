const { Router } = require('express');
const Gemstone = require('../models/Gemstone');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newGemstone = await Gemstone.createGemstone(req.body);
      res.json(newGemstone);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const singleGemstone = await Gemstone.getSingleGemstone(req.params.id);
    res.json(singleGemstone);
  })

  .get('/', async (req, res) => {
    const allGemstones = await Gemstone.getAllGemstones();
    res.json(allGemstones);
  });
