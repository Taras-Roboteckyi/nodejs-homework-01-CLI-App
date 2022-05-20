const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const cTable = require("console.table");

const contactsOperations = require("./contacts");
//console.log(contactsOperations);

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const contactsData = { name, phone, email };
      const newContact = await contactsOperations.addContact(contactsData);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);

const { argv } = yargs(arr);

invokeAction(argv);
/* invokeAction({ action: "list" }); */

/* invokeAction({ action: "get", id: "8" }); */

/* invokeAction({
  action: "add",
  name: "Taras",
  email: "tre@gmail.com",
  phone: "(748) 758-4896",
});
 */

/* invokeAction({ action: "remove", id: "355dcca2-8350-4bb9-bcaf-850bd83a5116" }); */
