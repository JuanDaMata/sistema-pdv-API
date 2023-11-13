const {listOrders} = require('../database/ordersDatabase')

const listOrders = async (req,res) => {
    try {
        const clinte_id = req.query.cliente_id;

        const orders = await listOrders(clinte_id);

        res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    listOrders
}