const { findByIdWithContext, listAll } = require("../database/utilsDatabase");
const {
    registerNewProductDatabase,
    editRegisteredProduct,
    // findAllProducts,
    findProductsByCategoryId
} = require("../database/productDatabase");

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade de estoque inválida" });
    };

    try {
        const productCategoryExist = await findByIdWithContext('categorias', categoria_id);

        if (!productCategoryExist) {
            return res.status(400).json({ mensagem: "A categoria informada não existe." })
        };

        const product = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        };

        const newProduct = await registerNewProductDatabase(product);

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade de estoque inválida" });
    };

    try {
        const productCategoryExist = await findByIdWithContext('categorias', categoria_id);

        if (!productCategoryExist) {
            return res.status(400).json({ mensagem: "A categoria informada não existe." })
        };

        const productExist = await findByIdWithContext('produtos', id);

        if (!productExist) {
            return res.status(400).json({ mensagem: "O produto informado não existe." })
        };

        await editRegisteredProduct(id, descricao, quantidade_estoque, valor, categoria_id);

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listProducts = async (req, res) => {
    const { categoria_id } = req.query;

    try {

        if (categoria_id) {
            const filteredProducts = await findProductsByCategoryId(categoria_id);
            return res.status(200).json(filteredProducts);
        }

        const products = await listAll('produtos');

        if (!products) {
            return res.status(404).json({ message: "O produto informado não existe." });
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
            return res.status(404).json({ message: "O produto informado não existe." });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    registerProduct,
    editProduct,
    listProducts,
    detailProduct
}