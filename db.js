const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// Link from MongoDB Atlas.
const connectionString =
  'mongodb+srv://admin:admin@ercluster-9gfo6.mongodb.net/test?retryWrites=true&w=majority';

// Connection to the Database.
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log('ERROR');
    console.error(err.message);
  }
};

module.exports = connectDB;
