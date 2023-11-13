const knex = require('../connections/knex');

const listOrders = async (cliente_id) => {
    try {
        let query = knex('pedidos')
        .select('pedidos.id', 'pedidos.valor_total', 'pedidos.observação', 'pedidos.cliente_id')
        .leftJoin('produtos_pedidos', 'pedidos.id', 'produtos_pedidos.pedidos_id')
        .leftJoin('produtos', 'produtos_pedidos.produtos_id', 'produtos.id');

        if (cliente_id) {
            query = query.where('pedidos.cliente_id', cliente_id)
        }

        const result = await query;

        const orders = [];

        result.forEach(row => {
            const orderIndex = orders.findIndex(o => o.pedido.id === row.id);

            if (orderIndex === -1) {
                const pedido = {
                    id: row.id,
                    valor_total: row.valor_total,
                    observacao: row.observacao,
                    cliente_id: row.cliente_id
                };

                const produto_pedido = {
                    id: row.produto_pedido_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                };

                orders.push({ pedido, pedido_produtos: [produto_pedido] });
            } else {
                const produto_pedido = {
                    id: row.produto_pedido_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                };

                pedidos[orderIndex].pedido_produtos.push(produto_pedido);
            }
        });

        return orders;
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    listOrders
}

