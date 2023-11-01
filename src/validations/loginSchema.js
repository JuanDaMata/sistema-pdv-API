const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const loginSchema = yup.object({
    email: yup.string().email().required(),
    senha: yup.string().required()
});

module.exports = loginSchema;