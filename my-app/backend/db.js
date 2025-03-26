const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://gofood:2032004@cluster0.s6k6l.mongodb.net/gofoodmern?retryWrites=true&w=majority';


const fetchData = async () => {
  try {
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,  
    });
    console.log('MongoDB connected successfully');

    
    const database = mongoose.connection.db;
    const collection = database.collection('sample');  
    const collections = database.collection('foodCategory')

    
    const data = await collection.find({}).toArray();
    const data2 = await collections.find({}).toArray();

    const foodCategorys = data2;
    
    if (data.length > 0) {
      global.sample = data;
      global.foodCategory = foodCategorys;
      // console.log(global.foodCategory);
      
    } else {
      console.log("No data found in the 'sample' collection.");
    }

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
  }

};

module.exports = fetchData;


// const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://gofood:2032004@cluster0.s6k6l.mongodb.net/sample?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri);

// const fetchData = async () => {
//     const connection = await client.connect();
    
//     if (connection) {
//         console.log("Connected");

//         // Select the database and collection
//         const database = client.db('gofoodmern');
//         const collection = database.collection('sample');

//         // Fetch data
//         const data = await collection.find({}).toArray();

//         if (data.length > 0) {
//             console.log(data);  // If data exists, print it
//         } else {
//             console.log("No data found in the collection.");
//         }

//         // Close connection after operation
//         await client.close();
//     } else {
//         console.log("Failed to connect to MongoDB.");
//     }
// };

// module.exports = fetchData;