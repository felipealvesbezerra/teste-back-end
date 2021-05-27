import User from "../models/User.js";

// Getting all
async function getUsers (req, res) {

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}

// Getting One
async function getUserId (req, res) {

  res.json(res.user);

}

// Creating One
async function postUser (req, res) {

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    gender: req.body.gender,
    email: req.body.email,
    age: req.body.age,
    cpf: req.body.cpf,
    address: req.body.address,
    bio: req.body.bio,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }

}

// Updating One
async function patchUser (req, res) {

  res.user.firstname = req.body.firstname;
  res.user.lastname = req.body.lastname;
  res.user.nickname = req.body.nickname;
  res.user.gender = req.body.gender;
  res.user.email = req.body.email;
  res.user.age = req.body.age;
  res.user.cpf = req.body.cpf;
  res.user.address = req.body.address;
  res.user.bio = req.body.bio;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }

}



export {
  getUsers,
  getUserId,
  postUser,
  patchUser,
};