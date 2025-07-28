const express = require('express');
const router = express.Router();
const { getHomePage, getFeedbackForm } = require('../controllers/pageController');

router.get('/', getHomePage);
router.get('/feedback', getFeedbackForm);

module.exports = router;