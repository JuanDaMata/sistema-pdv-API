const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const loginSchema = require('../validations/loginSchema');

const loginRouter = Router();

loginRouter.post('/login',
    validationBodyMiddleware(loginSchema)
);

module.exports = loginRouter;