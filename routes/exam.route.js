const express = require("express");
const { addQuestions, getQuestions, getResult } = require("../controllers/exam.controller");
const { auth } = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorization.middleware");
const route = express.Router();


route.post("/add",auth,authorizeAdmin,addQuestions);
route.get("/:id",getQuestions);
 route.post("/:id",auth,getResult);


module.exports = route