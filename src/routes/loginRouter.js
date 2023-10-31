const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const loginSchema = require('../validations/loginSchema');
const login = require('../controllers/loginController');

const loginRouter = Router();

loginRouter.post('/login',
    validationBodyMiddleware(loginSchema),
    login
);

module.exports = loginRouter;
