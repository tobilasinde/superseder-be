import { Router } from 'express'
var router = Router()

/* GET home page. */
router.get('/', function (req, res) {
	res.status(200).json({ title: 'Express' })
})

export default router
