const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const verifyLoggedUser = require('../middlewares/loginMiddleware');
const { detailClient } = require('../controllers/clientsController');

const clientRouter = Router();

clientRouter.get('/cliente/:id', validationBodyMiddleware(), verifyLoggedUser, detailClient);

module.exports = clientRouter;