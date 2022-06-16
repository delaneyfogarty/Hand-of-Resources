const { Router } = require('express');
const Flower = require('../models/Flower');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newFlower = await Flower.addFlower(req.body);
      res.json(newFlower);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const singleFlower = await Flower.getSingleFlower(id);
    res.json(singleFlower);
  })

  .get('/', async (req, res) => {
    const allFlowers = await Flower.getAllFlowers();
    res.json(allFlowers);
  });
