import User from "../models/User.js";

async function getUser(req, res, next) {

  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: 'cannot find user',
      });
    }
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.status(400).json({
        message: "User ID inexistent"
      });
    } else {
      res.status(500).json({
        error: error.message
      });
    }
  }

  res.user = user;

  next();

}

export default getUser;