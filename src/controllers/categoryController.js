const knex = require('../connections/knex');

const listAllCategorys = async (req, res) => {
    try {
        res.status(200).json(await knex('categorias'));
    }
    catch (error) {
        console.error(error.message);
    }
}

module.exports = listAllCategorys;