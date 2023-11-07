const { Router } = require('express');
const verifyLoggedUser = require('../middlewares/loginMiddleware');
const { validationBodyMiddleware, validationParamsMiddleware } = require('../middlewares/validation');
const { productSchema, productParamsIdSchema } = require('../validations/productSchema');
const { registerProduct } = require('../controllers/productController');

const productRouter = Router();

productRouter.post('/produto',
    verifyLoggedUser,
    validationBodyMiddleware(productSchema),
    registerProduct
);

productRouter.get('/produto',
    verifyLoggedUser,
    //controller
);

productRouter.get('/produto/:id',
    verifyLoggedUser,
    validationParamsMiddleware(productParamsIdSchema),
    //controller
);

productRouter.put('/produto/:id',
    verifyLoggedUser,
    validationBodyMiddleware(productSchema),
    validationParamsMiddleware(productParamsIdSchema),
    //controller
);

productRouter.delete('/produto/:id',
    verifyLoggedUser,
    validationParamsMiddleware(productParamsIdSchema),
    //controller
);

module.exports = productRouter;