const { findCategoriaById, registerNewProductDatabase } = require("../database/productDatabase");

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade de estoque inválida" });
    };

    try {
        const productCategory = await findCategoriaById(categoria_id);

        if (!productCategory) {
            return res.status(400).json({ mensagem: "A categoria informada não existe." })
        }

        const product = {
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        };

        const newProduct = await registerNewProductDatabase(product);

        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    registerProduct,
}