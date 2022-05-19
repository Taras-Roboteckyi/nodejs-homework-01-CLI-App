const contactsOperations = require("./contacts");
//console.log(contactsOperations);

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
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
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

/* invokeAction({ action: "list" }); */

/* invokeAction({ action: "get", id: "8" }); */

invokeAction({
  action: "add",
  name: "Taras",
  email: "tre@gmail.com",
  phone: "(748) 758-4896",
});
