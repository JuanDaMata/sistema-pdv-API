const { Router } = require('express');
const { validationBodyMiddleware } = require('../middlewares/validation');
const { userSchema } = require('../validations/userSchema');
const { userRegister, detailProfile, editProfile } = require('../controllers/userController');
const verifyLoggedUser = require('../middlewares/loginMiddleware');

const userRouter = Router();

userRouter.post('/usuario',
    validationBodyMiddleware(userSchema),
    userRegister
);

userRouter.get('/usuario',
    verifyLoggedUser,
    detailProfile
);

userRouter.put('/usuario',
    verifyLoggedUser,
    validationBodyMiddleware(userSchema),
    editProfile
);

module.exports = userRouter;