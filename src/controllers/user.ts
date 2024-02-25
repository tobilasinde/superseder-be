import { Request, Response } from 'express'
import { UserInterface } from '../global'
import {
	createUser,
	deleteUser,
	getUser,
	listUsers,
	updateUser,
} from '../service/user'
import { generateHash } from '../utils/functions'
// import { createAuth } from '../service/auth'
// import { welcomeEmail } from '../utils/emails'

export const createUserCtl = async (req: Request, res: Response) => {
	let user_id
	try {
		req.body.hash = generateHash(req.body.password, req.body.email).hash
		const data = await createUser(res.locals as UserInterface, req.body)
		user_id = data.id
		res.status(200).json({ data })
	} catch (error: any) {
		res.status(500).json({ status: false, message: error.message })
	} finally {
		// if (user_id) welcomeEmail(user_id, req.headers.origin!)
	}
}
export const updateUserCtl = async (req: Request, res: Response) => {
	const data = await updateUser(res.locals as UserInterface, req.body, {
		id: req.params.id,
	})
	if (!data[0])
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ status: true, message: 'Updated successfully' })
}
export const listUsersCtl = async (req: Request, res: Response) => {
	const data = await listUsers(res.locals as UserInterface, req.query)
	res.status(200).json({ data })
}
export const getUserCtl = async (req: Request, res: Response) => {
	const data = await getUser(
		res.locals as UserInterface,
		req.params.id,
		req.query
	)
	if (!data)
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ data })
}
export const getProfileCtl = async (req: Request, res: Response) => {
	const data = await getUser(
		res.locals as UserInterface,
		res.locals.iss,
		req.query
	)
	if (!data)
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ data })
}
export const deleteUserCtl = async (req: Request, res: Response) => {
	const data = await deleteUser(
		res.locals as UserInterface,
		req.params.id,
		req.query
	)
	if (!data)
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ status: true, message: 'Deleted successfully' })
}
