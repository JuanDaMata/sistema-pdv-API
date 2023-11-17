const { listingOrders, findProductForEachProductId, registeringOrder } = require('../database/ordersDatabase');
const { findByIdWithContext } = require('../database/utilsDatabase');
const htmlCompiler = require('../services/htmlCompiler');
const transporter = require('../connections/sendEmail');

const listOrders = async (req, res) => {
    try {
        const { cliente_id } = req.query;

        const orders = await listingOrders(cliente_id);

        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const registerOrder = async (req, res) => {
    const { cliente_id, pedido_produtos } = req.body

    try {
        const customerExists = await findByIdWithContext("clientes", cliente_id);

        if (!customerExists) {
            return res.status(400).json({ mensagem: "O cliente informado não existe." });
        };

        const verifiedProductOrder = await findProductForEachProductId(pedido_produtos);

        if (verifiedProductOrder.length > 0) {
            return res.status(400).json({ mensagem: "Não foi possível efetuar o pedido." });
        };

        const register = await registeringOrder(req.body);
        console.log(register)

        if (!register) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o pedido." });
        }

        const cliente = {
            nome: customerExists.nome,
            email: customerExists.email
        };

        const orderHTML = await htmlCompiler('./src/templates/order.html', {
            clientName: cliente.nome
        });

        transporter.sendMail({
            from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: "Confirmação de pedido.",
            html: orderHTML
        });

        return res.status(200).json({ mensagem: 'Pedido efetuado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    listOrders,
    registerOrder
}