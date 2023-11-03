const knex = require('../connections/knex');

const listAll = async context => {
    try {
        return await knex(context);
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const findByIdWithContext = async (context, id) => {
    try {
        const user = await knex(context).where({ id }).first();
        return user;
    }
    catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const findByEmailWithContext = async (context, email) => {
    try {
        const user = await knex(context).where({ email }).first();
        return user;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

module.exports = {
    listAll,
    findByIdWithContext,
    findByEmailWithContext
}