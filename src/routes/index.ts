import { Router } from 'express'
import auth from './auth'
import car from './car'
import user from './user'
import { getProfileCtl } from '../controllers/user'
var router = Router()

router.get('/profile', getProfileCtl)
router.use('/car', car)
router.use('/user', user)
router.use('/auth', auth)

export default router
