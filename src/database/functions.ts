import {
	DestroyOptions,
	FindAndCountOptions,
	FindOptions,
	Model,
} from 'sequelize'
import { UserInterface } from '../global'
import {
	prepareInputData,
	prepareParam,
	prepareResponseData,
} from '../utils/functions'
import DB from './index'

export const create = async (
	model: string,
	user: Record<string, any>,
	data: Record<string, any>
) => {
	data = prepareInputData(model, data, 'create', user as UserInterface)
	const result = await DB[model].create(data)
	return prepareResponseData(result.toJSON())
}
export const bulkCreate = async (
	model: string,
	user: Record<string, any>,
	data: Record<string, any>[],
	fieldToUpdate?: string[]
) => {
	data = data.map((d) => {
		const res = prepareInputData(model, d, 'both', user as UserInterface)
		if (d.id) res.id = d.id
		return res
	})
	const result = await DB[model].bulkCreate(data, {
		updateOnDuplicate: fieldToUpdate,
	})
	return result.map((r: Model) => prepareResponseData(r.toJSON()))
}
export const findOrCreate = async (
	model: string,
	user: Record<string, any>,
	data: Record<string, any>,
	where: Record<string, any>
): Promise<Record<string, any>> => {
	data = prepareInputData(model, data, 'create', user as UserInterface)
	where = prepareParam(model, where)
	const [res, created] = await DB[model].findOrCreate({
		where,
		defaults: { ...data },
		raw: false,
	})
	if (user.id) data.updatedBy = user.id
	if (!created) await res.update(data)
	return { created, ...prepareResponseData(res.toJSON()) }
}
export const update = async (
	model: string,
	user: Record<string, any>,
	data: Record<string, any>,
	where: Record<string, any>
) => {
	data = prepareInputData(model, data, 'update', user as UserInterface)
	where = prepareParam(model, where)
	if (!Object.keys(where).length) return [0]
	return await DB[model].update(data, { where })
}
export const findOne = async (model: string, query: FindOptions) => {
	const result = await DB[model].findOne(query)
	return result ? prepareResponseData(result.toJSON()) : result
}
export const findAll = async (model: string, query: FindOptions) => {
	const result = await DB[model].findAll(query)
	return prepareResponseData({ result }).result
}
export const findAndCountAll = async (
	model: string,
	query: FindAndCountOptions
) => {
	const result = await DB[model].findAndCountAll(query)
	return {
		count: result.count,
		rows: result.rows.map((r: Model) => prepareResponseData(r.toJSON())),
	}
}
export const _delete = async (model: string, query: DestroyOptions) => {
	const result = await DB[model].destroy(query)
	return result
}
