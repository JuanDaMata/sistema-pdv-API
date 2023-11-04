const yup = require('yup');
const { pt } = require('yup-locales');
const { validate } = require('./loginSchema');
yup.setLocale(pt);

const clientRegisterSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().min(11).max(14).required(),
    cep: yup.string().min(8).max(9),
    rua: yup.string(),
    numero: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string().min(2)
});

const clientParamsIdSchema = yup.object({
    id: yup.number().integer().positive().required()
});

module.exports = {
    clientRegisterSchema,
    clientParamsIdSchema
};