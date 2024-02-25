'use strict'

import { fuelType } from '../../config/fuel.config'

/*************************************************************************
API Car Table
*************************************************************************/

export default (sequelize, DataTypes) => {
	const Car = sequelize.define(
		'Car',
		{
			make: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			model: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			transmission: {
				type: DataTypes.ENUM('manual', 'automatic', 'semi-auto', 'other'),
				allowNull: false,
			},
			mileage: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			fuelType: {
				type: DataTypes.ENUM('petrol', 'diesel', 'other', 'hybrid', 'electric'),
				allowNull: false,
			},
			tax: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			mpg: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			engineSize: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			maintenanceCostYearly: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			averageMaintenaceCostYearly: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue(
						'averageMaintenaceCostYearly',
						getAvgMaintenaceCost(this.dataValues)
					)
				},
			},
			total0Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total0Years', getTotalByYear(this.dataValues, 0))
				},
			},
			total1Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total1Years', getTotalByYear(this.dataValues, 1))
				},
			},
			total2Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total2Years', getTotalByYear(this.dataValues, 2))
				},
			},
			total3Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total3Years', getTotalByYear(this.dataValues, 3))
				},
			},
			total4Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total4Years', getTotalByYear(this.dataValues, 4))
				},
			},
			total5Years: {
				type: DataTypes.FLOAT,
				set() {
					this.setDataValue('total5Years', getTotalByYear(this.dataValues, 5))
				},
			},
		},
		{ paranoid: true }
	)

	Car.associate = (models) => {}

	return Car
}
const getAvgMaintenaceCost = (data) => {
	const currentYear = new Date().getFullYear()
	const years = currentYear - Number(data.year)
	const milePerYear = Number(data.mileage) / years
	const mpgPerYear = milePerYear / Number(data.mpg)
	const fuelCostPerYear = mpgPerYear * fuelType[data.fuelType]
	return Number(
		(
			fuelCostPerYear +
			Number(data.tax) +
			Number(data.maintenanceCostYearly)
		).toFixed(2)
	)
}
const getTotalByYear = (data, years) => {
	const amc = getAvgMaintenaceCost(data) * (years || 1)
	return Number((Number(data.price) + amc).toFixed(2))
}
