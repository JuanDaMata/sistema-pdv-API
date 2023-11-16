const { findByIdWithContext, listAllWithContext } = require("../database/utilsDatabase");
const {
    registerNewProductDatabase,
    editRegisteredProduct,
    deleteRegisterProduct,
    findProductsByCategoryId
} = require("../database/productDatabase");
const validatesWhetherTheProductBelongsToAnOrder = require("../services/deleteProductValidation");
const { uploadFiles, deleteFiles } = require("../services/upload");

const registerProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade de estoque inválida" });
    }

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

        if (file) {
            const { id } = newProduct;

            const fileName = file.originalname.trim().split(' ').join('');

            const { url } = await uploadFiles(
                `produtos/${id}/${fileName}`,
                file.buffer,
                file.mimetype
            );

            const productUpdated = {
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: url
            };

            const newProductUpdated = await editRegisteredProduct(id, productUpdated);

            return res.status(201).json(newProductUpdated);
        };

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { file } = req;

    if (quantidade_estoque < 0) {
        return res.status(400).json({ mensagem: "Quantidade de estoque inválida" });
    };

    try {
        const productCategoryExist = await findByIdWithContext('categorias', categoria_id);

        if (!productCategoryExist) {
            return res.status(400).json({ mensagem: "A categoria informada não existe." });
        }

        const productExist = await findByIdWithContext('produtos', id);

        if (!productExist) {
            return res.status(400).json({ mensagem: "O produto informado não existe." });
        }

        if (file) {
            const fileName = file.originalname.trim().split(' ').join('');

            const { url } = await uploadFiles(
                `produtos/${id}/${fileName}`,
                file.buffer,
                file.mimetype
            );

            const productUpdated = {
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: url
            };

            await editRegisteredProduct(id, productUpdated);

            const deleteFileName = productExist.produto_imagem.split('/')[5];
            const path = `produtos/${id}/${deleteFileName}`;

            await deleteFiles(path);

            return res.status(201).json({ mensagem: "Produto atualizado com sucesso." });
        };

        const editedProduct = {
            id,
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        };

        await editRegisteredProduct(id, editedProduct);

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productExist = await findByIdWithContext("produtos", id);

        if (!productExist) {
            return res.status(400).json({ mensagem: "O produto informado não existe." });
        };

        const hasOrders = await validatesWhetherTheProductBelongsToAnOrder(productExist);
        if (hasOrders) return res.status(403).json({ mensagem: "O produto informado está presente em um pedido e não pode ser excluído." });

        const deleteFileName = productExist.produto_imagem.split('/')[5];
        const path = `produtos/${id}/${deleteFileName}`;

        await deleteFiles(path);
        await deleteRegisterProduct(id);

        return res.status(200).json({ mensagem: "Produto excluido com sucesso." });
    }

    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listProducts = async (req, res) => {
    const { categoria_id } = req.query;

    try {

        if (categoria_id) {
            const filteredProducts = await findProductsByCategoryId(categoria_id);

            if (filteredProducts.length == 0) {
                return res.status(200).json({ mensagem: "Não há produtos cadastrados na categoria informada." })
            };

            return res.status(200).json(filteredProducts);
        };

        const products = await listAllWithContext('produtos');

        if (!products) {
            return res.status(404).json({ mensagem: "O produto informado não existe." });
        };

        return res.status(200).json(products);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

const detailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await findByIdWithContext('produtos', productId);

        if (!product) {
            return res.status(404).json({ mensagem: "O produto informado não existe." });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = {
    registerProduct,
    editProduct,
    deleteProduct,
    listProducts,
    detailProduct
};
