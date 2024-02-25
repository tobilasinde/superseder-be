import { Router } from 'express'
import validate, { baseRules } from '../middlewares/validations/base'
import { validationRules } from '../middlewares/validations/user'
import {
	createUserCtl,
	deleteUserCtl,
	getUserCtl,
	listUsersCtl,
	updateUserCtl,
} from '../controllers/user'
var router = Router()

router.post('/', validate(validationRules['create']), createUserCtl)
router.put('/:id', validate(validationRules['update']), updateUserCtl)
router.get('/:id', validate(baseRules['get']), getUserCtl)
router.get('/', validate(baseRules['list']), listUsersCtl)
router.delete('/:id', validate(baseRules['delete']), deleteUserCtl)

export default router
