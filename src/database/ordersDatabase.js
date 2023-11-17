const knex = require("../connections/knex");

const findProductForEachProductId = async (pedido_produto) => {
    try {
        const invalidProducts = [];

        for (const produto of pedido_produto) {
            let currentProduct = await knex('produtos').where('id', produto.produto_id).first()

            if (!currentProduct || currentProduct.quantidade_estoque < produto.quantidade_produto) {
                invalidProducts.push(currentProduct);
            }

        };

        return invalidProducts;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const totalValue = async (pedido_produto) => {
    try {
        let totalValueOrder = 0;

        for (const produto of pedido_produto) {
            let currentProduct = await knex('produtos').where('id', produto.produto_id).first();

            totalValueOrder += currentProduct.valor * produto.quantidade_produto
        };

        return totalValueOrder;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};

const registeringOrder = async (body) => {
    try {
        for (const produto of body.pedido_produtos) {
            const order = await knex('pedidos')
                .insert({
                    cliente_id: body.cliente_id,
                    observacao: body.observacao,
                    valor_total: await totalValue(body.pedido_produtos)
                }).returning('*');

            const currentProduct = await knex('produtos').where('id', produto.produto_id).first();

            await knex('pedido_produtos')
                .insert({
                    pedido_id: order[0].id,
                    produto_id: produto.produto_id,
                    quantidade_produto: produto.quantidade_produto,
                    valor_produto: currentProduct.valor
                }).returning('*');

            let reducedQuantity = currentProduct.quantidade_estoque - produto.quantidade_produto;

            await knex('produtos')
                .where('id', '=', produto.produto_id)
                .update({
                    quantidade_estoque: reducedQuantity
                })
        };

        return
    } catch (error) {
        return new Error("Erro no cadastro do pedido");
    }
};

module.exports = {
    findProductForEachProductId,
    registeringOrder
};
