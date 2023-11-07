const { Router } = require("express");
const { validationBodyMiddleware, validationParamsMiddleware } = require("../middlewares/validation");
const verifyLoggedUser = require("../middlewares/loginMiddleware");
const { clientRegisterSchema, clientParamsIdSchema } = require("../validations/clientSchema");
const {
    detailClient,
    listAllClients,
    clientRegister,
    editClient,
} = require("../controllers/clientsController");

const clientRouter = Router();

clientRouter.post("/cliente",
    verifyLoggedUser,
    validationBodyMiddleware(clientRegisterSchema),
    clientRegister
);

clientRouter.get("/cliente",
    verifyLoggedUser,
    listAllClients
);

clientRouter.get("/cliente/:id",
    verifyLoggedUser,
    validationParamsMiddleware(clientParamsIdSchema),
    detailClient
);

clientRouter.put("/cliente/:id",
    verifyLoggedUser,
    validationParamsMiddleware(clientParamsIdSchema),
    validationBodyMiddleware(clientRegisterSchema),
    editClient
);

module.exports = clientRouter;
