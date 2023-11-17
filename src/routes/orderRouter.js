const { Router } = require("express");
const verifyLoggedUser = require("../middlewares/loginMiddleware");
const { validationBodyMiddleware } = require("../middlewares/validation");
const orderRegisterSchema = require("../validations/orderSchema");
const { registerOrder } = require("../controllers/ordersController");

const orderRouter = Router();

orderRouter.post("/pedido",
    verifyLoggedUser,
    validationBodyMiddleware(orderRegisterSchema),
    registerOrder
);

module.exports = orderRouter;