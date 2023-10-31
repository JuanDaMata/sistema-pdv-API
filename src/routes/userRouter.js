const { Router } = require('express');
const validationBodyMiddleware = require('../middlewares/validation');
const { userRegisterSchema, userUpdateSchema } = require('../validations/userSchema');
const { userRegister, detailProfile, editProfile } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/usuario',
    validationBodyMiddleware(userRegisterSchema),
    userRegister
);

userRouter.get('/usuario', detailProfile);

userRouter.put('/usuario',
    validationBodyMiddleware(userUpdateSchema),
    editProfile
);

module.exports = userRouter;