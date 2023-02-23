const mongoose = require('mongoose');

const connectDB = () => {
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/myfirstdb",
{useNewUrlParser: true,
useUnifiedTopology: true})
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(() => {
    console.error("database connection failed");
  });
}

module.exports = connectDB;

// const mongo_uri = 'mongodb://127.0.0.1:27017/myfirstdb';

// exports.connect = () => {

//     mongoose
//       .connect(mongo_uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => {
//         console.log("Successfully connected to database");
//       })
//       .catch(() => {
//         console.error("database connection failed");
//       });
//   };
  
