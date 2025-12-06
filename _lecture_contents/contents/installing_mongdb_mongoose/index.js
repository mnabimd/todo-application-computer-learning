// Download MONGODB
//Download and install from:
// https://www.mongodb.com/try/download/community

// db.js

// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
   try {
      await mongoose.connect('mongodb_db_uri', {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      console.log('MongoDB connected');
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
};

module.exports = connectDB;
