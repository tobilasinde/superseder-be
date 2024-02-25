import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const authorize = async (req: Request, res: Response, next: NextFunction) => {
	let errorCode = 401
	try {
		const { authorization } = req.headers
		if (!authorization) throw new Error('Unauthorized user.')
		if (!authorization.startsWith('Bearer '))
			throw new Error('Unauthorized user.')
		const token = authorization.split(' ')[1]
		if (token == '') throw new Error('Unauthorized user.')
		const decodedToken = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as JwtPayload
		//store in locals for later use
		res.locals = {
			...res.locals,
			...decodedToken,
		}
		//move from middleware to next
		return next()
	} catch (error: any) {
		if (
			error.message === 'jwt expired' &&
			req.url === '/api/v1/auth/refresh_token' &&
			req.method === 'POST'
		)
			return next()
		if (openRoutes.find((o) => o.url === req.url && o.method === req.method))
			return allowOpenRoute(req, res, next)
		return res
			.status(errorCode || 401)
			.send({ status: false, message: error.message })
	}
}
export default authorize
const openRoutes = [
	{ url: '/api/user', method: 'POST' },
	{ url: '/api/car?', method: 'GET' },
	{ url: '/api/auth/verify_reset_token', method: 'POST' },
	{ url: '/api/auth/reset_password_request', method: 'POST' },
	{ url: '/api/auth/change_password', method: 'POST' },
	{ url: '/api/auth/login', method: 'POST' },
]
const allowOpenRoute = (req: Request, res: Response, next: NextFunction) => {
	next()
}
// export const UnauthenticatedAuthorization = async (req, res, next) => {
// 	try {
// 		const u = new URL(req.headers.origin)
// 		const { authorization } = req.headers
// 		if (authorization) return AuthenticatedAuthorization1(req, res, next)
// 		const school = await schoolRepository.findOne({
// 			where: { Url: u.hostname },
// 		})
// 		if (!school) throw new CustomError('School not found.', 404)
// 		res.locals = {
// 			...res.locals,
// 			school_id: school.id,
// 		}
// 		return next()
// 	} catch (error) {
// 		return res
// 			.status(error.status || 400)
// 			.send({ message: error.message || 'Error fetching school data' })
// 	}
// }

// const AuthenticatedAuthorization1 = async (req, res, next) => {
// 	try {
// 		//headers should have authorization field
// 		const { authorization } = req.headers
// 		//if authorization token is undefined or null or empty return unauthorized
// 		if (!authorization) throw new CustomError('Unauthorized user.', 401)

// 		//token should be in the form of Bearer asdada32424ilsnk.......

// 		//if authorization token does not contain Bearer then return unauthorized
// 		if (!authorization.startsWith('Bearer '))
// 			throw new CustomError('Unauthorized user.', 401)

// 		//token contains Bearer, let's check if token has data along sides Bearer key
// 		//we will split token with 'Bearer ', if we get an array of exact length 2 then it means token has data otherwise it does not have or it is malformed
// 		const token = authorization.replace('Bearer ', '')

// 		if (token == '') throw new CustomError('Unauthorized user.', 401)

// 		// Decode JWT token
// 		const decodedToken = verify(token, process.env.JWT_SECRET)
// 		if (!decodedToken) throw new CustomError('Expired Token', 403)
// 		// return res.status(403).json({
// 		// 	status: false,
// 		// 	message: 'Expired Token',
// 		// })
// 		//store in locals for later use
// 		res.locals = {
// 			...res.locals,
// 			...decodedToken.payload,
// 		}
// 		//move from middleware to next
// 		return next()
// 	} catch (error) {
// 		delete req.headers.authorization
// 		return UnauthenticatedAuthorization(req, res, next)
// 	}
// }
