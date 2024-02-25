import { NextFunction, Request, Response } from 'express'
import {
	ValidationChain,
	check,
	param,
	query,
	validationResult,
} from 'express-validator'

/**
 * Checks for Validation errors. If errors, responds with errors Or moves to the next middleware in the Route chain
 * @param {object} validations - ValidationChains Object
 */
const validate = (validations: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		await Promise.all(validations.map((validation: any) => validation.run(req)))
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(422).json({
				status: false,
				message: 'Validation Error(s)',
				data: errors.array(),
			})

		return next()
	}
}

export default validate

export const baseRules: { [index: string]: ValidationChain[] } = {
	delete: [param('id').trim().notEmpty().isString().escape()],
	get: [param('id').trim().notEmpty().isString().escape()],
	list: [
		query('search').optional().isString().escape(),
		query('sort_field').optional().isString().escape(),
		query('sort_order').optional().isIn(['desc', 'asc']),
		query('page_size').optional().isInt({ min: 1 }),
		query('page_number').optional().isInt({ min: 1 }),
	],
}
