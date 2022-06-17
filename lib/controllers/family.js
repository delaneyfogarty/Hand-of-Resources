const { Router } = require('express');
const Family = require('../models/Family');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const singleFamilyMember = await Family.getSingleFamilyMember(
      req.params.id
    );
    res.json(singleFamilyMember);
  })

  .get('/', async (req, res, next) => {
    try {
      const allFamily = await Family.getAllFamilyMembers();
      res.json(allFamily);
    } catch (e) {
      next(e);
    }
  });
