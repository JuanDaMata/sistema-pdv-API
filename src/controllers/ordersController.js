const { findProductForEachProductId, registeringOrder } = require('../database/ordersDatabase');
const { findByIdWithContext } = require('../database/utilsDatabase');
const htmlCompiler = require('../services/htmlCompiler');
const transporter = require('../connections/sendEmail');

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

        await registeringOrder(req.body);

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
    registerOrder
};