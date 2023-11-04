const { Router } = require('express');
const { validationBodyMiddleware, validationParamsMiddleware } = require('../middlewares/validation');
const verifyLoggedUser = require('../middlewares/loginMiddleware');
const { detailClient, listAllClients, clientRegister } = require('../controllers/clientsController');
const { clientRegisterSchema, clientParamsIdSchema } = require('../validations/clientSchema');

const clientRouter = Router();

clientRouter.post('/cliente',
    verifyLoggedUser,
    validationBodyMiddleware(clientRegisterSchema),
    clientRegister
);

clientRouter.get('/cliente',
    verifyLoggedUser,
    listAllClients
);

clientRouter.get('/cliente/:id',
    verifyLoggedUser,
    validationParamsMiddleware(clientParamsIdSchema),
    detailClient
);

clientRouter.put('/cliente/:id',
    verifyLoggedUser,
    validationParamsMiddleware(clientParamsIdSchema),
    validationBodyMiddleware(clientRegisterSchema),
    //controller
);

module.exports = clientRouter;