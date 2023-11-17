const { Router } = require("express");
const verifyLoggedUser = require("../middlewares/loginMiddleware");

const { listOrders } = require('../controllers/ordersController');

const ordersRouter = Router();


ordersRouter.get('/pedido',
    verifyLoggedUser,
    listOrders
);

module.exports = ordersRouter