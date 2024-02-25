// import './pg_enum_fix.js'
import cls from 'cls-hooked'
const namespace = cls.createNamespace('schedule')
import { Sequelize, DataTypes } from 'sequelize'
Sequelize.useCLS(namespace)
const env = (process.env.NODE_ENV as NODE_ENV) || 'development'
import dbConfig from '../config/db.config.js'
import * as models from './models'
import { NODE_ENV } from '../global.js'
const config = dbConfig[env]

const db: any = {}
let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		...(config as any),
		logging: false,
		// query: { raw: true },
		multipleStatements: true,
	}
)
const m: any = models
Object.keys(m).forEach((file) => {
	const model = m[file](sequelize, DataTypes)
	db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

// sequelize.addHook('beforeCount', function (options) {
//   if (this._scope.include && this._scope.include.length > 0) {
//     options.distinct = true
//     options.col =
//       this._scope.col || options.col || `"${this.options.name.singular}".id`
//   }

//   if (options.include && options.include.length > 0) {
//     options.include = null
//   }
// })
//Sync Database
sequelize
	.sync({ alter: true })
	.then(async function () {
		console.log('DB update successful')
	})
	.catch(function (err) {
		console.log(err, 'Something went wrong with the Database Update!')
	})
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
