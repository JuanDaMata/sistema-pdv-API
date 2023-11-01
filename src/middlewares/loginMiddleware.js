const jwt = require('jsonwebtoken');

const verifyLoggedUser = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);

        req.user = {
            id: user.id,
            nome: user.nome,
            email: user.email
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = verifyLoggedUser;