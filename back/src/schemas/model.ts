import Joi, { string } from "joi";

const Schemas = {
    user_register: Joi.object({
        account_name: Joi.string().min(4).required(),
        password: Joi.string().min(5).required(),
        nickname: Joi.string().min(4).required()
    }),
    user_login: Joi.object({
        account_name: Joi.string().min(1).required(),
        password: Joi.string().min(5).required()
    }),
    authentication: Joi.object({
        account_name: Joi.string().required()
    }),
    getIdol: Joi.object({
        idol_id: Joi.number().min(1),
        idol_name: Joi.string().min(1),
        page: Joi.number().min(1)
    }),
    sessionTokenSchema: Joi.object({
        token: Joi.string().required()
    })
};

export default Schemas;