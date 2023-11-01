const { Router } = require('express');
const listAllCategorys = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/categoria', listAllCategorys);

module.exports = categoryRouter;