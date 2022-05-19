const { v4: uuidv4 } = require("uuid");

const fs = require("fs/promises");
const path = require("path");

const contactsBasePath = "db/contacts.json";

const contactsPath = path.join(__dirname, contactsBasePath);
console.log(contactsPath);

// TODO: задокументировать каждую функцию

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

function removeContact(contactId) {
  // ...твой код
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...data };
  contacts.push(newContact);
  console.log(contacts);
  /*  await fs.writeFile(contactsPath, JSON.stringify(contacts)); */
  return newContact;
}

module.exports = { listContacts, getContactById, addContact };
