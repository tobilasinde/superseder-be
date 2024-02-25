import { Request, Response } from 'express'
import { UserInterface } from '../global'
import {
	createCar,
	deleteCar,
	getCar,
	listCars,
	loadFromCsv,
	updateCar,
} from '../service/car'

export const createCarCtl = async (req: Request, res: Response) => {
	const data = await createCar(res.locals as UserInterface, req.body)
	res.status(200).json({ data })
}
export const updateCarCtl = async (req: Request, res: Response) => {
	const data = await updateCar(res.locals as UserInterface, req.body, {
		id: req.params.id,
	})
	if (!data[0])
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ status: true, message: 'Updated successfully' })
}
export const listCarsCtl = async (req: Request, res: Response) => {
	const data = await listCars(res.locals as UserInterface, req.query)
	res.status(200).json({ data })
}
export const getCarCtl = async (req: Request, res: Response) => {
	const data = await getCar(
		res.locals as UserInterface,
		req.params.id,
		req.query
	)
	if (!data)
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ data })
}
export const deleteCarCtl = async (req: Request, res: Response) => {
	const data = await deleteCar(
		res.locals as UserInterface,
		req.params.id,
		req.query
	)
	if (!data)
		return res.status(404).json({ status: false, message: 'Not found' })
	res.status(200).json({ status: true, message: 'Deleted successfully' })
}
export const loadFromCsvCtl = async () => {
	const data = await loadFromCsv([
		'audi',
		'bmw',
		'ford',
		'hyundai',
		'mercedes',
		'skoda',
		'toyota',
		'vauxhall',
		'volkswagen',
	])
	console.log(data)
	return data
}
// loadFromCsvCtl()
