import { findOne } from '../database/functions'
import jwt from 'jsonwebtoken'
import { CustomError } from '../middlewares/errorHandlers'
import { generateHash } from '../utils/functions'
const modelName = 'User'

export const login = async (data: { email: string; password: string }) => {
	const where: any = { email: data.email }
	const u = await findOne(modelName, {
		where,
	})
	if (!u) throw new CustomError('Invalid Email', 400)
	if (generateHash(data.password, data.email).hash !== u.hash)
		throw new CustomError('Invalid Password', 400)
	if (!u) throw new CustomError('No active account found', 404)
	const payload = {
		iss: u.id,
		id: u.id,
		sub: u.id,
		email: u.email,
	}
	const token = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: '1h',
	})
	const refresh_token = generateHash(token, process.env.JWT_SECRET).hash
	return { token, token_type: 'Bearer', refresh_token }
}
