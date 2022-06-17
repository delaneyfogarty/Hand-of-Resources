const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
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
