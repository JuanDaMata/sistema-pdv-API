const knex = require('../connections/knex');

const findByEmail = async (email) => {
    try {
        const user = await knex("usuarios").where({email}).first();
        return user;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const registerNewUserDatabase = async (nome, email, senha) => {
    try {
        const registeredUser = await knex("usuarios").insert({
            nome,
            email,
            senha: cryptographedPassword
        }).returning(["id", "nome", "email"]);

        return registeredUser[0];
    } catch (error) {
        return new Error("Erro no cadastro do usuário.");
    }
};

module.exports = {
    findByEmail,
    registerNewUserDatabase
};