const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const pesticideRoutes = require('./routes/pesticideRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());

app.use(session({
  secret: 'agro-secret',
  resave: false,
  saveUninitialized: false,
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/agro-ecosystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/farmers', farmerRoutes);
app.use('/pesticides', pesticideRoutes);
app.use('/vendors', vendorRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

