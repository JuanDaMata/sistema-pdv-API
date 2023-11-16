const { listingOrders } = require('../database/ordersDatabase');
const { findByIdWithContext } = require('../database/utilsDatabase');

const listOrders = async (req, res) => {
    try {
        const clinte_id = req.query.cliente_id;

        const orders = await listingOrders(clinte_id);

        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const registerOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        const customerExists = findByIdWithContext("clientes", cliente_id);

        if (!customerExists) {
            return res.status(400).json({ mensagem: "O cliente informado não existe." });
        };

        // const loginHTML = await htmlCompiler('.src/templates/login.html', {
        //     clientName: cliente.nome
        // });

        // transporter.sendMail({
        //     from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        //     to: `${cliente.nome} <${cliente.email}>`,
        //     loginHTML
        // });

        return res.status(200).json({ mensagem: 'Pedido efetuado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    listOrders,
    registerOrder
}