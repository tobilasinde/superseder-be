import {
	_delete,
	bulkCreate,
	findAndCountAll,
	findOne,
	findOrCreate,
	update,
} from '../database/functions'
import { prepareGetParams } from '../utils/functions'
import { UserInterface } from '../global'
import csv from 'csvtojson'
import { Op, OrderItem } from 'sequelize'
import { settings } from '../config/settings.config'
const modelName = 'Car'

export const createCar = async (
	user: UserInterface,
	data: Record<string, any>
) => {
	return await findOrCreate(modelName, user, data, {
		name: data.name,
	})
}
export const updateCar = async (
	user: UserInterface,
	data: Record<string, any>,
	where: Record<string, any>
) => {
	return await update(modelName, user, data, where)
}
export const listCars = async (
	user: UserInterface,
	query: Record<string, any>
) => {
	const user_detail = await findOne('User', { where: { id: user.iss } })
	const where: any = {}
	if (user_detail.fav_brands) where.make = user_detail.fav_brands
	if (user_detail.min_year) where.year = { [Op.gte]: user_detail.min_year }
	if (user_detail.transmission) where.transmission = user_detail.transmission
	if (user_detail.max_mileage)
		where.mileage = { [Op.lte]: user_detail.max_mileage }
	if (user_detail.fuel_type) where.fuelType = user_detail.fuel_type
	if (user_detail.max_budget) where.price = { [Op.lte]: user_detail.max_budget }
	if (user_detail.min_budget) where.price = { [Op.gte]: user_detail.min_budget }
	if (user_detail.annual_income && user_detail.purchase_preference > 0) {
		const incomeInXYears =
			user_detail.annual_income *
			user_detail.purchase_preference *
			settings.percentage_of_income
		where[`total${user_detail.purchase_preference}Years`] = {
			[Op.lte]: incomeInXYears,
		}
	}
	const order: OrderItem[] = [
		[
			query.sort_field
				? query.sort_field
						.split('_')
						.map((x: string, i: number) => {
							return i ? x.charAt(0).toUpperCase() + x.slice(1) : x
						})
						.join('')
				: 'mileage',
			query.sort_order || 'asc',
		],
	]
	const limit = query.page_size || 20
	const offset = (Number(query.page_number || 1) - 1) * limit
	return await findAndCountAll(modelName, { where, order, limit, offset })
}
export const getCar = async (
	user: UserInterface,
	id: string,
	query?: Record<string, any>
) => {
	const params = { where: { id } }
	return await findOne(modelName, params)
}
export const deleteCar = async (
	user: UserInterface,
	id: string,
	query?: Record<string, any>
) => {
	const params = { where: { id } }
	return await _delete(modelName, params)
}
export const loadFromCsv = async (file_names: string[]) => {
	try {
		let total_count = 0
		for (const file_name of file_names) {
			let maintenance: any = []
			let cars: any = []
			await csv()
				.fromFile('./data/maintenance.csv')
				.then((jsonObj) => {
					maintenance = jsonObj
				})
			await csv()
				.fromFile('./data/cars/' + file_name + '.csv')
				.then((jsonObj) => {
					cars = jsonObj
				})
			cars.forEach(async (car: any) => {
				Object.keys(car).forEach((key) => {
					car[key] = car[key].trim().toLowerCase()
				})
				car.make = file_name
				car.fuel_type = car.fuelType
				car.engine_size = car.engineSize
				const main = maintenance.find(
					(m: any) =>
						m.Make.toLowerCase().trim() === file_name &&
						m.Model.toLowerCase().trim() === car.model.toLowerCase().trim() &&
						m.Year === car.year
				)
				if (main) {
					car.maintenance_cost_yearly = main.MaintenanceCostYearly
				}
				car.average_maintenace_cost_yearly = 0
				car.total0_years = 0
				car.total1_years = 0
				car.total2_years = 0
				car.total3_years = 0
				car.total4_years = 0
				car.total5_years = 0
			})
			const results = await bulkCreate(modelName, {}, cars)
			total_count += results.length
		}
		return {
			status: true,
			total_count,
		}
	} catch (error: any) {
		console.log(error.message)
	}
}
