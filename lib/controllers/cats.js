const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedCat = await Cat.updateCat(id, req.body);
      res.json(updatedCat);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCat = await Cat.addCat(req.body);
      res.json(newCat);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleCat = await Cat.getSingleCat(id);
      res.json(singleCat);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const allCats = await Cat.getAllCats();
      res.json(allCats);
    } catch (e) {
      next(e);
    }
  });
