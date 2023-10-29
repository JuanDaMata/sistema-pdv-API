const validationBodyMiddleware = yupSchema => async (req, res, next) => {
    try {
        await yupSchema.validate(req.body);
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = validationBodyMiddleware;