const mongoose = require('mongoose');
const mongoURI ="mongodb://localhost:27017/Chatbot";
const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

module.exports = connectToMongo;