const knex = require("../connections/knex");

const findClientByCpf = async (cpf) => {
  try {
    const client = await knex("clientes").where({ cpf }).first();
    return client;
  } catch (error) {
    return new Error("Erro de comunicação.");
  }
};

const registerNewClientDatabase = async (client) => {
  try {
    const registeredClient = await knex("clientes")
      .insert(client)
      .returning("*");
    return registeredClient[0];
  } catch (error) {
    return new Error("Erro no cadastro do usuário.");
  }
};

const editClientWithContext = async (id, client) => {
  try {
    const user = await knex("clientes").where({ id }).update(client);

    console.log("Resultado da atualização:", user);
    return user;
  } catch (error) {
    console.error("Erro durante a atualização:", error);
    return new Error("Erro de comunicação.");
  }
};

module.exports = {
  findClientByCpf,
  registerNewClientDatabase,
  editClientWithContext,
};
