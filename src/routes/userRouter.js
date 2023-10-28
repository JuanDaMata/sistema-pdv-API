const { Router } = require('express');
const { userRegister } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/usuario', userRegister);
userRouter.get('/usuario');
userRouter.put('/usuario');

module.exports = userRouter;