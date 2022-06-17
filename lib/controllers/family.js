const { Router } = require('express');
const Family = require('../models/Family');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedFamilyMember = await Family.deleteFamilyMember(id);
      res.json(deletedFamilyMember);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedFamilyMember = await Family.updateFamilyMember(id, req.body);
      res.json(updatedFamilyMember);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newFamilyMember = await Family.createFamilyMember(req.body);
      res.json(newFamilyMember);
    } catch (e) {
      next(e);
    }
  })
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
