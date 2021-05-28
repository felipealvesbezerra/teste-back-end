const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptPassword = async (password) => {
  if (!password) {
    return null;
  }
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const comparePassword = async (password, hash) => {
  if (!password || !hash) {
    return false;
  }
  const compare = await bcrypt.compare(password, hash);
  return compare;
};

module.exports = {
  encryptPassword: encryptPassword,
  comparePassword: comparePassword,
};
