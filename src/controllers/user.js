import User from "../models/User.js";

export async function getUsers(req, res) {

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}

export async function getUserId(req, res) {

  res.json(res.user);

}

export async function postUser(req, res) {

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

export async function patchUser(req, res) {

  if (req.body.firstname) res.user.firstname = req.body.firstname;
  if (req.body.lastname) res.user.lastname = req.body.lastname;
  if (req.body.nickname) res.user.nickname = req.body.nickname;
  if (req.body.gender) res.user.gender = req.body.gender;
  if (req.body.email) res.user.email = req.body.email;
  if (req.body.age) res.user.age = req.body.age;
  if (req.body.cpf) res.user.cpf = req.body.cpf;
  if (req.body.address) res.user.address = req.body.address;
  if (req.body.bio) res.user.bio = req.body.bio;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }

}

export async function deleteUser(req, res) {

  try {
    await res.user.remove();
    res.json({
      message: 'user deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}