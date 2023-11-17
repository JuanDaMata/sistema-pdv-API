const yup = require('yup');
const { pt } = require('yup-locales');
yup.setLocale(pt);

const orderRegisterSchema = yup.object({
    cliente_id: yup.number().integer().positive().required(),
    observacao: yup.string().default(""),
    pedido_produtos: yup.array().of(
        yup.object({
            produto_id: yup.number().positive().integer().required(),
            quantidade_produto: yup.number().positive().integer().required()
        })
    ).min(1).required()
});

module.exports = orderRegisterSchema
