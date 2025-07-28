const Feedback = require('../models/Feedback');

// @desc    Submit feedback
// @route   POST /feedback
exports.submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.redirect(`/feedback/${feedback._id}`);
  } catch (err) {
    console.error(err);
    res.render('feedback', {
      error: 'Please provide valid information',
      values: req.body
    });
  }
};

// @desc    Get all feedback
// @route   GET /feedback/list
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.render('list', { 
      feedbacks: feedbacks,
      title: 'All Testimonials' 
    });
  } catch (err) {
    console.error(err);
    res.render('list', { 
      error: 'Error loading testimonials',
      feedbacks: [] 
    });
  }
};

// @desc    Get single feedback
// @route   GET /feedback/:id
// In your feedbackController.js
exports.getSingleFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).lean();
    console.log("Database result:", JSON.stringify(feedback, null, 2)); // Detailed log
    
    if (!feedback) {
      return res.render('error', { message: 'Testimonial not found' });
    }

    // Transform data if needed (example)
    const viewData = {
      feedback: {
        name: feedback.name || 'Anonymous',
        email: feedback.email,
        message: feedback.message,
        rating: feedback.rating,
        createdAt: feedback.createdAt,
        id: feedback._id.toString()
      },
      currentUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    };

    console.log("Data being sent to template:", JSON.stringify(viewData, null, 2));
    
    return res.render('single', viewData);
    
  } catch (err) {
    console.error("Error:", err);
    return res.render('error', { message: 'Error loading testimonial' });
  }
};