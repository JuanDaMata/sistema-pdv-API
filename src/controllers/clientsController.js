const { findByIdWithContext, listAll } = require("../database/generic");

const detailClient = async (req, res) => {
    const clientId = req.params.id;

    if (!clientId) return res.status(400).json({ msg: "O campo id é obrigatório" });
    if (isNaN(clientId)) return res.status(400).json({ msg: "O campo id deve ser um número válido" });

    try {
        const client = await findByIdWithContext("clientes", clientId);
        if (!client) return res.status(404).json({ mensagem: "Cliente não encontrado" });
        return res.status(200).json(client);
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listAllClients = async (req, res) => {
    try {
        return res.status(200).json(await listAll("clientes"));
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    detailClient,
    listAllClients
}