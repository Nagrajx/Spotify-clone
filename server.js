const app = require('./src/app');
const connectedDb = require("./src/db/db")

connectedDb()

app.listen(3000,()=>{
    console.log("Server Started Successfully");
})