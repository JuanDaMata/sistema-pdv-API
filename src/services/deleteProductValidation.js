const { listAllWithContext } = require("../database/utilsDatabase");

const validatesWhetherTheProductBelongsToAnOrder = async existingProduct => {
    const product_orders = await listAllWithContext("pedido_produtos");

    let hasOrdersWithProduct = product_orders.some(product => product.produto_id === existingProduct.id);
    return hasOrdersWithProduct;
}

module.exports = validatesWhetherTheProductBelongsToAnOrder;