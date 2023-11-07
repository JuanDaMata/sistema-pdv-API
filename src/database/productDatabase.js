const knex = require('../connections/knex');

const registerNewProductDatabase = async (product) => {
    try {
        const registeredProduct = await knex('produtos').insert(product).returning("*");
        return registeredProduct[0];
    } catch (error) {
        return new Error("Erro no cadastro do produto.");
    }
};

const editRegisteredProduct = async (id, descricao, quantidade_estoque, valor, categoria_id) => {
    try {
        const editedProduct = await knex('produtos')
            .where('id', id)
            .update({ descricao, quantidade_estoque, valor, categoria_id });

        return editedProduct;
    } catch (error) {
        return new Error("Erro ao atualizar produto.");
    }
};

// const findAllProducts = async () => {
//     try {

//         const products = await knex('produtos');

//         return products;
//     } catch (error) {
//         return new Error("Erro de comunicação.");
//     }
// };

const findProductsByCategoryId = async (categoria_id) => {
    try {
        const products = await knex('produtos').where('categoria_id', categoria_id);

        return products;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

module.exports = {
    registerNewProductDatabase,
    editRegisteredProduct,
    // findAllProducts,
    findProductsByCategoryId
}