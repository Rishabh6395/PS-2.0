const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser)
router.post('/user/logout', authController.logoutUser)
router.post('/admin/register', authController.registerAdmin)
router.post('/admin/login', authController.loginAdmin)
router.post('/admin/logout', authController.logoutAdmin)

module.exports = router;