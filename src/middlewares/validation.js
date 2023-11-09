const validationBodyMiddleware = yupSchema => async (req, res, next) => {
    try {
        await yupSchema.validate(req.body);
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

const validationParamsMiddleware = yupSchema => async (req, res, next) => {
    try {
        await yupSchema.validate(req.params);
        next()
    } catch (error) {
        if (isNaN(error.params.value)) {
            return res.status(400).json({ mensagem: "O id deve ser um número." })
        }
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = {
    validationBodyMiddleware,
    validationParamsMiddleware
}