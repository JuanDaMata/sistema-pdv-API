const { listingOrders } = require('../database/ordersDatabase')

const listOrders = async (req, res) => {
    try {
        const { cliente_id } = req.query;

        const orders = await listingOrders(cliente_id);

        res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


module.exports = {
    listOrders
}