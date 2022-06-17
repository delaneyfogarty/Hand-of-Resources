const { Router } = require('express');
const Gemstone = require('../models/Gemstone');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedGem = await Gemstone.deleteGemstone(id);
      res.json(deletedGem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedGemstone = await Gemstone.updateGemstone(id, req.body);
      res.json(updatedGemstone);
    } catch (e) {
      next(e);
    }
  })
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
