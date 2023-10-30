const knex = require('../connections/knex');

const listCategories = async (req, res) => {
    try {
        return await knex('categorias');
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = listCategories;