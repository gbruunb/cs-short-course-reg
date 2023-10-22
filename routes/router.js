const express = require('express')
const router = express.Router()

const MainController = require('../controllers/MainController')
const LecturerController = require('../controllers/LecturerController')
const StudentController = require('../controllers/StudentController')


router.get('/',MainController.home)
router.get('/signin',MainController.signInPage)
router.get('/register',MainController.registerPage)

router.get('/create-course-form',LecturerController.createCourseForm)
router.get('/course-list',StudentController.showCourseList)
router.get('/open-course',StudentController.openCourse)
router.get('/edit-course/:id',LecturerController.editCourseForm)

router.post('/register',MainController.register)

router.post('/add-course',LecturerController.addCourse)
router.post('/update-course/:id',LecturerController.editCourse)
router.get('/delete-course/:id',LecturerController.deleteCourse)


module.exports = router
