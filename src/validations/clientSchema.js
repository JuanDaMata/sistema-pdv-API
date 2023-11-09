const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const clientRegisterSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().max(11).required(),
    cep: yup.string().length(8),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string().length(2)
});

const clientParamsIdSchema = yup.object({
    id: yup.number().integer().positive().required()
});

module.exports = {
    clientRegisterSchema,
    clientParamsIdSchema
};