const knex = require('../connections/knex');

const findByEmail = async (email) => {
    try {
        const user = await knex("usuarios").where({ email }).first();
        return user;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const findById = async (id) => {
    try {
        const user = await knex("usuarios").where({ id }).first();
        return user;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const emailVerifyUpdate = async (email, id) => {
    try {
        const user = await knex("usuarios").where({ email }).andWhere("id", "!=", id).first();
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
            senha
        }).returning(["id", "nome", "email"]);

        return registeredUser[0];
    } catch (error) {
        return new Error("Erro no cadastro do usuário.");
    }
};

const editUserProfile = async (req, nome, email, senha) => {
    const userLoged = req;

    try {
        const userEdited = await knex("usuarios")
            .where('id', userLoged)
            .update({ nome, email, senha });

        return userEdited;
    } catch (error) {
        return new Error("Erro ao atualização usuário.");
    }
};

module.exports = {
    findByEmail,
    findById,
    emailVerifyUpdate,
    registerNewUserDatabase,
    editUserProfile
};