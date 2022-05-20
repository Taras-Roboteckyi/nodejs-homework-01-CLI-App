const { v4: uuidv4 } = require("uuid");

const fs = require("fs/promises");
const path = require("path");

const contactsBasePath = "db/contacts.json";

const contactsPath = path.join(__dirname, contactsBasePath);
console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  const removeContactById = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(removeContactById));
  return contacts[idx];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { ...data, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
