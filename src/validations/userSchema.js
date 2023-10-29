const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const userRegisterSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
});

const userUpdateSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
});

module.exports = {
    userRegisterSchema,
    userUpdateSchema
};