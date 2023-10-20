const express = require('express')
const router = express.Router()

const MainController = require('../controllers/MainController')
const LecturerController = require('../controllers/LecturerController')

router.get('/',MainController.home)
router.get('/create-course-form',LecturerController.createCourseForm)

router.post('/add-course',LecturerController.addCourse)

module.exports = router
