const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const userDetailSchema = yup.object({
    id: yup.number().integer().positive().required()
});

module.exports = {
    userDetailSchema,
};