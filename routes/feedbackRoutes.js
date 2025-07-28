const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  getSingleFeedback
} = require('../controllers/feedbackController');

router.post('/', submitFeedback);
router.get('/list', getAllFeedback);
router.get('/:id', getSingleFeedback);

module.exports = router;