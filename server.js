const express = require("express");
const app = express();
const connection = require("./config/db");
const router = require("./routes");
require("dotenv").config();




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

