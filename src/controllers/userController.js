const bcrypt = require("bcrypt");
const {
  findByEmail,
  registerNewUserDatabase,
} = require("../database/userDatabase");

const userRegister = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const user = await findByEmail(email);

    if (user) {
      return res.status(400).json({
        mensagem: "O e-mail informado já existe.",
      });
    }

    const cryptographedPassword = await bcrypt.hash(senha, 10);

    const registeredUser = await registerNewUserDatabase(
      nome,
      email,
      cryptographedPassword
    );

    return res.status(201).json(registeredUser);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  userRegister,
};
