const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");




const register =async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
      const emailcheck = await userModel.findOne({ email });
      if (emailcheck) {
        res.status(400).send({ msg: "email already used" });
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          const user = new userModel({
            name,
            email,
            role,
            password: hash,
          });
          await user.save();
          res.status(200).send({ "msg": "Registration successfull" });
        });
      }
    } catch (error) {
      res.status(400).send({ "msg": error.message });
    }
  }


const login =  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        console.log(user)
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.status(200).send({
              msg: "login successfull",
              token: jwt.sign({ _id: user._id, role: user.role }, process.env.secret_code),
              id:user._id,
              role:user.role,
              name:user.name,
              email:user.email
            });
          } else {
            res.status(400).send({"msg":"wrong credential"});
          }
        });
      } else {
        res.status(400).send({ msg: "No user exist" });
      }
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }



  module.exports = {
    register,
    login
};
