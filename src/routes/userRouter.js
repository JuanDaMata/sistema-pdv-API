const { Router } = require('express');

const userRouter = Router();

userRouter.post('/usuario');
userRouter.get('/usuario');
userRouter.put('/usuario');

module.exports = userRouter;