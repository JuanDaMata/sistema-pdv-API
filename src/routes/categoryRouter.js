const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.get('/categoria', () => {
    console.log('ok');
});

module.exports = categoryRouter;