const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const productSchema = yup.object({
    descricao: yup.string().required(),
    quantidade_estoque: yup.number().integer().required(),
    valor: yup.number().positive().integer().required(),
    categoria_id: yup.number().required()
});

const productParamsIdSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    productSchema,
    productParamsIdSchema
};