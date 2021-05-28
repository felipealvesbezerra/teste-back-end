const checkBody = (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ error: "body empty" });
  }
};

//  check email
const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const checkLogin = (req, res, next) => {
  checkBody(req, res);
  const body = req.body;
  if (!body.email) {
    return res.status(400).json({ error: "email  incorrect" });
  }
  if (!body.password) {
    return res.status(400).json({ error: "password incorrect" });
  }
  const validateEmail = checkEmail(body.email);
  if (!validateEmail) {
    return res.status(400).json({ error: "format of email  incorrect" });
  }

  next();
};

module.exports = {
  checkLogin: checkLogin,
};
