import { body, ValidationChain } from 'express-validator'

export const validationRules: { [index: string]: ValidationChain[] } = {
	create: [
		body('firstname').trim().notEmpty().isString().escape(),
		body('lastname').trim().notEmpty().isString().escape(),
		body('email').trim().notEmpty().isEmail().escape(),
		body('phone').trim().optional().isString().escape(),
		body('password').trim().notEmpty().isString().escape(),
	],
	update: [
		body('firstname').trim().optional().isString().escape(),
		body('lastname').trim().optional().isString().escape(),
		body('email').trim().optional().isEmail().escape(),
		body('phone').trim().optional().isString().escape(),
		body('annual_income').optional().isFloat(),
		body('fav_brand').optional().isString().escape(),
		body('min_year').optional().isInt(),
		body('transmission').trim().optional().isIn(['manual', 'automatic', '']),
		body('max_mileage').optional().isInt(),
		body('fuel_type').trim().optional().isIn(['petrol', 'diesel', '']),
		body('max_mileage').optional().isInt(),
		body('min_budget').optional().isInt(),
		body('max_budget').optional().isInt(),
		body('status').optional().isBoolean().escape(),
	],
}
