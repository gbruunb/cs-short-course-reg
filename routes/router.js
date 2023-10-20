const express = require('express')
const router = express.Router()

const MainController = require('../controllers/MainController')

router.get('/',MainController.gett)
router.get('/3',MainController.home3)

module.exports = router
