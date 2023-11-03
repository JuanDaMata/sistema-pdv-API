const findById = async id => {
    try {
        const user = await knex("clientes").where({ id }).first();
        return user;
    } catch (error) {
        return new Error("Erro de comunicação.");
    }
};