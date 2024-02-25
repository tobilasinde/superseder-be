import { Request, Response } from 'express'
import { login } from '../service/auth'

export const loginCtl = async (req: Request, res: Response) => {
	const data = await login(req.body)
	return res.status(200).json({ status: true, data })
}
