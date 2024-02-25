import { Router } from 'express'
import validate, { baseRules } from '../middlewares/validations/base'
// import { validationRules } from '../middlewares/validations/location'
import {
	// createCarCtl,
	// deleteCarCtl,
	getCarCtl,
	listCarsCtl,
	// updateCarCtl,
} from '../controllers/car'
var router = Router()

// router.post('/', validate(validationRules['create']), createCarCtl)
// router.put('/:id', validate(validationRules['update']), updateCarCtl)
router.get('/:id', validate(baseRules['get']), getCarCtl)
router.get('/', validate(baseRules['list']), listCarsCtl)
// router.delete('/:id', validate(baseRules['delete']), deleteCarCtl)

export default router
