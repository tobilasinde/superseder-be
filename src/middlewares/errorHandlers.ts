import { NextFunction, Request, Response } from 'express'
import { RESPONSE_ERROR_SERVER_ERROR } from '../config/response.config'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		return res.status(err.status).json({ status: false, message: err.message })
	} else {
		return res.status(500).json({
			status: false,
			message:
				process.env.NODE_ENV === 'production'
					? RESPONSE_ERROR_SERVER_ERROR
					: err.message,
		})
	}
}
export class CustomError extends Error {
	status: number
	constructor(message: string, status?: number) {
		super(message)
		this.status = status || 400
	}
}
