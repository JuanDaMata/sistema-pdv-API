const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByEmailWithContext } = require("../database/utilsDatabase");

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const userFound = await findByEmailWithContext('usuarios', email);

    if (!userFound) {
      return res.status(401).json({ mensagem: "Email ou senha inválido" });
    }

    const correctPassword = await bcrypt.compare(senha, userFound.senha);

    if (!correctPassword) {
      return res.status(401).json({ mensagem: "Email ou senha inválido" });
    }

    const userTokenData = {
      id: userFound.id,
      nome: userFound.nome,
      email: userFound.email
    };

    const token = jwt.sign(userTokenData, process.env.SECRET_KEY, {
      expiresIn: "8h"
    });

    const { senha: newPass, ...userData } = userFound;

    return res.status(200).json({
      user: userData,
      token
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = login;
