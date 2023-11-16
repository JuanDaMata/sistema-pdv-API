const knex = require("../connections/knex");

const listingOrders = async (cliente_id) => {
  try {
    let query = knex("pedidos")
      .select(
        "pedidos.id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",
        "pedido_produtos.id as pedidoProduto_id",
        "pedido_produtos.quantidade_produto",
        "pedido_produtos.valor_produto",
        "pedido_produtos.pedido_id",
        "pedido_produtos.produto_id"
      )
      .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
      .leftJoin("produtos", "pedido_produtos.produto_id", "produtos.id");

    if (cliente_id) {
      query = query.where("pedidos.cliente_id", cliente_id);
    }

    const result = await query;

    const orders = [];

    result.forEach((row) => {
      const orderIndex = orders.findIndex((o) => o.pedido.id === row.id);

      if (orderIndex === -1) {
        const order = {
          id: row.id,
          valor_total: row.valor_total,
          observacao: row.observacao,
          cliente_id: row.cliente_id,
        };

        const productOrder = {
          id: row.pedidoProduto_id,
          quantidade_produto: row.quantidade_produto,
          valor_produto: row.valor_produto,
          pedido_id: row.pedido_id,
          produto_id: row.produto_id,
        };

        orders.push({ pedido: order, pedido_produtos: [productOrder] });
      } else {
        const productOrder = {
          id: row.pedidoProduto_id,
          quantidade_produto: row.quantidade_produto,
          valor_produto: row.valor_produto,
          pedido_id: row.pedido_id,
          produto_id: row.produto_id,
        };

        orders[orderIndex].pedido_produtos.push(productOrder);
      }
    });

    return orders;
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  listingOrders,
};
