// @desc    Home page
// @route   GET /
exports.getHomePage = (req, res) => {
  res.render('index');
};

// @desc    Feedback form
// @route   GET /feedback
exports.getFeedbackForm = (req, res) => {
  res.render('feedback', { values: {} });
};