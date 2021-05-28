const Contact = require("../models/contact");

const addContact = async (form) => {
  const person = new Contact(form);
  const contact = await person.save();
  return contact;
};

const readContact = async (email) => {
  const contact = await Contact.findOne({ email: email });
  return contact;
};

const updateContact = async (email, form) => {
  const contact = await Contact.findOneAndUpdate({ email: email }, form, {
    new: true,
  });
  return contact;
};

const deleteContact = async (email) => {
  const contact = await Contact.findOneAndDelete({ email: email });
  return contact;
};

module.exports = {
  addContact: addContact,
  readContact: readContact,
  updateContact: updateContact,
  deleteContact: deleteContact,
};
