const Contact = require("../models/contact");

const listContactsDB = async () => {
  const contact = await Contact.find();
  return contact;
};

const listContactsNameDB = async (req) => {
  const contact = await Contact.find({
    name: { $regex: `${req.params.name}`, $options: "i" },
  });
  return contact;
};

module.exports = {
  listContactsDB: listContactsDB,
  listContactsNameDB,
  listContactsNameDB,
};
