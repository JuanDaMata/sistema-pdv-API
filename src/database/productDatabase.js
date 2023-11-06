const { id } = require("yup-locales");
const knex = require("../connections/knex");

const findCategoriaById = async (categoria_id) => {
  try {
    const product = await knex("categorias").where("id", categoria_id).first();
    return product;
  } catch (error) {
    return new Error("Erro de comunicação.");
  }
};

const registerNewProductDatabase = async (product) => {
  try {
    const registeredProduct = await knex("produtos")
      .insert(product)
      .returning("*");
    return registeredProduct[0];
  } catch (error) {
    return new Error("Erro no cadastro do produto.");
  }
};

const findProductById = async (id) => {
  try {
    const productExist = await knex("produtos").where("id", id).first();
    return productExist;
  } catch (error) {
    return new Error("Erro de comunicação.");
  }
};

const editRegisteredProduct = async (
  id,
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) => {
  try {
    const editedProduct = await knex("produtos")
      .where("id", id)
      .update({ descricao, quantidade_estoque, valor, categoria_id });

    return editedProduct;
  } catch (error) {
    return new Error("Erro ao atualizar produto.");
  }
};

const deleteRegisterProduct = async (id) => {
  try {
    const deleteProduct = await knex("produtos").where({ id }).del();
  } catch (error) {
    return new Error("Erro ao atualizar produto.");
  }
};
module.exports = {
  findCategoriaById,
  registerNewProductDatabase,
  findProductById,
  editRegisteredProduct,
  deleteRegisterProduct,
};
