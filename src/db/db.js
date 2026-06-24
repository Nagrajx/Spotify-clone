const  mongoose = require('mongoose');
require('dotenv').config();

const connetedDb =async ()=>{
   try{
     await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("DataBase Connected");
    
   }
   catch(err){
    console.log("Something went wrong on db connection",err);
   }
}

module.exports =connetedDb;