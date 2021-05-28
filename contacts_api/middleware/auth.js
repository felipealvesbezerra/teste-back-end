const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json("token not provided");
  }
  const check = authorization.split(" ");
  const type = check[0];
  const token = check[1];
  if (type !== "Bearer") {
    return res.status(401).json("token  with format incorrect");
  }

  if (!token) {
    return res.status(401).json("token  not found");
  }

  const verify = jwt.verify(token, "shhhhh", (err, data) => {
    if (err) {
      return false;
    }
    return true;
  });
  if (!verify) {
    return res.status(401).json("token invalid");
  }
  next();
};

module.exports = auth;
