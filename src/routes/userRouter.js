const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const { userRegisterSchema, userUpdateSchema } = require('../validations/userSchema');
const { userRegister } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/usuario',
    validationBodyMiddleware(userRegisterSchema),
    userRegister
);

userRouter.get('/usuario');

userRouter.put('/usuario',
    validationBodyMiddleware(userUpdateSchema)
);

module.exports = userRouter;