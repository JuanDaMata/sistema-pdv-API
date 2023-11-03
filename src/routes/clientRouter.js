const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const verifyLoggedUser = require('../middlewares/loginMiddleware');
const { detailClient, listAllClients } = require('../controllers/clientsController');
const { userDetailSchema } = require('../validations/clientSchema');

const clientRouter = Router();

clientRouter.get('/cliente', verifyLoggedUser, listAllClients);
clientRouter.get('/cliente/:id',
    verifyLoggedUser,
    detailClient
);

module.exports = clientRouter;