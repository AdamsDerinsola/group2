
const express = require ('express');
const pageController = require('../controller/pageController')
const bcrypt = require('bcryptjs')
const router = express.Router()

// Landing page
router.get('/', pageController.page_index)

// Sign up
router.get('/register', pageController.signup_page)

// Login
router.get('/signin', pageController.page_login)

// 
router.get('/login', pageController.login_post)

// Add user
router.post('/', pageController.signup_post)

// Profile
router.get('/profile', pageController.profile_page)

module.exports = router