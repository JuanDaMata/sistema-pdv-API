const { Router } = require('express');
const knex = require('../connections/knex');
const listAllCategorys = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/categoria', listAllCategorys);

module.exports = categoryRouter;