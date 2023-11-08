const bcrypt = require('bcrypt');
const {
    registerNewUserDatabase,
    editUserProfile,
    emailVerifyUpdate
} = require('../database/userDatabase');
const { findByIdWithContext, findByEmailWithContext } = require('../database/utilsDatabase');

const userRegister = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const user = await findByEmailWithContext('usuarios', email);

        if (user) {
            return res.status(400).json({ mensagem: "O e-mail informado já existe." });
        }

        const cryptographedPassword = await bcrypt.hash(senha, 10);

        const registeredUser = await registerNewUserDatabase(
            nome,
            email,
            cryptographedPassword
        );

        return res.status(201).json(registeredUser);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detailProfile = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await findByIdWithContext("usuarios", id);

        const userDetail = {
            id: user.id,
            nome: user.nome,
            email: user.email
        };

        return res.status(200).json(userDetail);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editProfile = async (req, res) => {
    const { nome, email, senha } = req.body;
    const userLogged = req.user.id;

    try {
        const userEmail = await emailVerifyUpdate(email, userLogged);

        if (userEmail) {
            return res.status(400).json({ mensagem: "O e-mail informado já existe." });
        }

        const cryptographedPassword = await bcrypt.hash(senha, 10);

        await editUserProfile(userLogged, nome, email, cryptographedPassword);
        return res.status(201).json({ mensagem: "Usuário atualizado com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensagem });
    }
};

module.exports = {
    userRegister,
    detailProfile,
    editProfile
};
