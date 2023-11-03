const { Router } = require('express');
const { validationBodyMiddleware } = require('../middlewares/validation');
const { userRegisterSchema, userUpdateSchema } = require('../validations/userSchema');
const { userRegister, detailProfile, editProfile } = require('../controllers/userController');
const verifyLoggedUser = require('../middlewares/loginMiddleware');

const userRouter = Router();

userRouter.post('/usuario',
    validationBodyMiddleware(userRegisterSchema),
    userRegister
);

userRouter.get('/usuario',
    verifyLoggedUser,
    detailProfile
);

userRouter.put('/usuario',
    verifyLoggedUser,
    validationBodyMiddleware(userUpdateSchema),
    editProfile
);

module.exports = userRouter;