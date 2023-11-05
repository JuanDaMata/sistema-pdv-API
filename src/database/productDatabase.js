const knex = require('../connections/knex');

const findCategoriaById = async (categoria_id) => {
    try {
        const product = await knex('categorias').where('id', categoria_id).first();
        return product;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const registerNewProductDatabase  = async (product) => {
    try {
        const registeredProduct = await knex('produtos').insert(product).returning("*");
        return registeredProduct[0];
    } catch (error) {
        return new Error("Erro no cadastro do produto.");
    }
};

module.exports = {
    findCategoriaById,
    registerNewProductDatabase
}