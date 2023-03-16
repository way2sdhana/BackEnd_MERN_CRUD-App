// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const userModel = require('../model/user-model');
const userModel = require('./User-model');

const showRecByMail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("my email is "+req.body.email);
    if (!email) {
      res.status(400).json({ message: "email required" });
    }
    const user = await userModel.findOne({ email });
    if(user){
      user.message="Login Success";
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "email mismatch" });
    }
  }
    
  catch (err) {
    console.log(err);
    res.status(400).send({ message: "invalid credentials" });
  }
}

const showRecByid = async (req, res) => {
  try {
    const { _id } = req.body;
    // console.log("my id is "+req.body._id);
    if (!_id) {
      res.status(400).json({ message: "personnel id required" });
    }
    const user = await userModel.findOne({ _id });
    if(user){
      user.message="Login Success";
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "id mismatch" });
    }
  }
    
  catch (err) {
    console.log(err);
    res.status(400).send({ message: "invalid credentials" });
  }
}

module.exports = {showRecByMail, showRecByid}