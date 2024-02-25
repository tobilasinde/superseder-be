'use strict'

/*************************************************************************
API User Table
*************************************************************************/

export default (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			phone: DataTypes.STRING,
			annualIncome: DataTypes.FLOAT,
			favBrands: DataTypes.ARRAY(DataTypes.STRING),
			minYear: DataTypes.INTEGER,
			transmission: DataTypes.ENUM('manual', 'automatic', 'semi-auto', 'other'),
			maxMileage: DataTypes.FLOAT,
			fuelType: DataTypes.ENUM(
				'petrol',
				'diesel',
				'other',
				'hybrid',
				'electric'
			),
			minBudget: DataTypes.FLOAT,
			maxBudget: DataTypes.FLOAT,
			purchasePreference: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				validate: {
					min: 0,
					max: 5,
				},
			},
			hash: DataTypes.TEXT,
		},
		{ paranoid: true }
	)

	User.associate = (models) => {}

	return User
}
