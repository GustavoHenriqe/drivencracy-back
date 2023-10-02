import joi from "joi";

export const pollCreateSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string().allow("")
});

export const choiceCreateSchema = joi.object({
    title: joi.string().required(),
    pollId: joi.string().required()
})