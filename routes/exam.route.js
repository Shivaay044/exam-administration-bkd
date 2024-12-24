const express = require("express");
const { addQuestions, getQuestions, getResult } = require("../controllers/exam.controller");
const { auth } = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorization.middleware");
const route = express.Router();


route.post("/add",auth,authorizeAdmin,addQuestions);
route.get("/",getQuestions);
route.post("/:id",getResult);


module.exports = route