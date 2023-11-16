const knex = require("../connections/knex");

const registerNewProductDatabase = async (product) => {
    try {
        const registeredProduct = await knex("produtos").insert(product).returning("*");
        return registeredProduct[0];
    } catch (error) {
        return new Error("Erro no cadastro do produto.");
    }
};

const editRegisteredProduct = async (id, product) => {
    try {
        const editedProduct = await knex("produtos")
            .where("id", id)
            .update(product)
            .returning('*');

        return editedProduct[0];
    } catch (error) {
        return new Error("Erro ao atualizar produto.");
    }
};

const deleteRegisterProduct = async (id) => {
    try {
        const deleteProduct = await knex("produtos").where({ id }).del();
    } catch (error) {
        return new Error("Erro ao atualizar produto.");
    }
};

const findProductsByCategoryId = async (categoria_id) => {
    try {
        const products = await knex('produtos').where({ categoria_id });

        return products;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

module.exports = {
    registerNewProductDatabase,
    editRegisteredProduct,
    deleteRegisterProduct,
    findProductsByCategoryId
};
