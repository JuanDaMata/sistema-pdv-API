const bcrypt = require('bcrypt');
const { findByEmail, registerNewUserDatabase, editUserProfile, emailVerifyUpdate } = require('../database/userDatabase');

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

const detailProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.user;

  try {
    const userEmail = await emailVerifyUpdate(email, id);

    if (userEmail) {
      return res.status(400).json({ mensagem: "O e-mail informado já existe." });
    }

    const cryptographedPassword = await bcrypt.hash(senha, 10);
   
    await editUserProfile(userLoged, nome, email, cryptographedPassword);
   
    return res.status(201).json({ mensagem: "Usuário atualizado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.mensagem });
  }
};

module.exports = {
  userRegister,
  detailProfile,
  editProfile
};
