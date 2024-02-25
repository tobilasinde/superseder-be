import {
	_delete,
	findAndCountAll,
	findOne,
	findOrCreate,
	update,
} from '../database/functions'
import { prepareGetParams } from '../utils/functions'
import { UserInterface } from '../global'
const modelName = 'User'

export const createUser = async (
	user: UserInterface,
	data: Record<string, any>
) => {
	const result = await findOrCreate(modelName, user, data, {
		email: data.email,
	})
	return result
}
export const updateUser = async (
	user: UserInterface,
	data: Record<string, any>,
	where: Record<string, any>
) => {
	return await update(modelName, user, data, where)
}
export const listUsers = async (
	user: UserInterface,
	query: Record<string, any>
) => {
	const params = prepareGetParams(modelName, query, user, [
		'firstname',
		'lastname',
		'email',
	])
	return await findAndCountAll(modelName, params)
}
export const getUser = async (
	user: UserInterface,
	id: string,
	query?: Record<string, any>
) => {
	const params = { where: { id } }
	return await findOne(modelName, params)
}
export const deleteUser = async (
	user: UserInterface,
	id: string,
	query?: Record<string, any>
) => {
	const params = { where: { id } }
	return await _delete(modelName, params)
}
