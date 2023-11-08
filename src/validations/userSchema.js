const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const userSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
});

module.exports = {
    userSchema
};