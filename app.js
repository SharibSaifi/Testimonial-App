const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Database connection
const db = require('./config/db');
mongoose.connect(db.mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Handlebars Configuration
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    json: (context) => JSON.stringify(context),
    times: (n, block) => {
      let accum = '';
      for (let i = 0; i < n; i++) accum += block.fn(i);
      return accum;
    },
    eq: (a, b) => a === b,
    formatDate: (date) => new Date(date).toLocaleDateString()
  }
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Debug paths
console.log('Views directory:', path.join(__dirname, 'views'));
console.log('Layouts directory:', path.join(__dirname, 'views/layouts'));

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', require('./routes/pageRoutes'));
app.use('/feedback', require('./routes/feedbackRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));