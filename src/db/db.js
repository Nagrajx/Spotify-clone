const  mongoose = require('mongoose');
require('dotenv').config();

const connetedDb =async ()=>{
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("DataBase Connected");
    
}

module.exports =connetedDb;