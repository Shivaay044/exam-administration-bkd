const express = require("express");
const router = express.Router();
const userRoute = require("./register.route");
const examRoute = require("./exam.route");



router.use("/api/auth",userRoute);
router.use("/api/exam",examRoute)



module.exports = router;