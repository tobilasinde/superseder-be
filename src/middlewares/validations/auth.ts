import { body, ValidationChain } from 'express-validator'

export const validationRules: { [index: string]: ValidationChain[] } = {
	login: [
		body('email').trim().notEmpty().isEmail().escape(),
		body('password').trim().notEmpty().isString().escape(),
	],
}
