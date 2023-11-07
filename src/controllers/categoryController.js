const { listAll } = require("../database/utilsDatabase");

const listAllCategorys = async (req, res) => {
    try {
        const categories = await listAll('categorias');
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = listAllCategorys;