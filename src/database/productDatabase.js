const knex = require('../connections/knex');

const findAllProducts = async () => {
    try {     
   
        const products = await knex('produtos');  

        return products;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const findProductsByCategoryId = async (categoria_id) => {
    try {
        const products = await knex('produtos').where('categoria_id', categoria_id);
        
        return products;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

module.exports = {
    findAllProducts,
    findProductsByCategoryId,
}