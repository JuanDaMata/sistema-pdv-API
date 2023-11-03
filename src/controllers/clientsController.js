const detailClient = async (req, res) => {
    const idUserLoged = req.user.id;

    try {
        res.status(200).json(findById(idUserLoged));
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    detailClient
}