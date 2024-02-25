import { Router } from 'express'
import { validationRules } from '../middlewares/validations/auth'
import { loginCtl } from '../controllers/auth'
import validate from '../middlewares/validations/base'
var router = Router()

router.post('/login', validate(validationRules['login']), loginCtl)

export default router
