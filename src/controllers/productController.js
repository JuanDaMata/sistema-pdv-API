const knex = require('knex');
const { findAllProducts, findProductsByCategoryId } = require('../database/productDatabase');

const listProducts = async (req, res) => {      
    const {categoria_id} = req.query;
      
    try {

        if (categoria_id) {
            const filteredProducts = await findProductsByCategoryId(categoria_id);
            return res.status(200).json(filteredProducts);
        }

        const products = await findAllProducts();
        
        if (!products) {
            return res.status(404).json({message: "O produto informado não existe."});
        }

        return res.status(200).json(products);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const detailProduct = async (req, res) => {    
    try {
        const productId = req.params;
        const product = await findByIdWithContext('produtos', productId);

        if (!product) {
            return res.status(404).json({message: "O produto informado não existe."});
        }
        
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listProducts,
    detailProduct
}