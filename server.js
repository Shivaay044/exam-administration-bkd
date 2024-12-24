const express = require("express");
const app = express();
const connection = require("./config/db");
const router = require("./routes");
const cors = require("cors");   
require("dotenv").config();



app.use(cors())
app.use(express.json());
app.use(router)




app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Server is Running at PORT ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})

