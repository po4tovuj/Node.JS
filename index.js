const readline = require('readline');
const { program } = require('commander');

const {
  showContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts.js');

const invokeAction = async ({ action = 'list', id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await showContacts();
      if (!contacts) {
        console.log('No contacts available');
      }
      console.table(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ${id} wasn't found`);
      }
      console.table(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      if (!newContact) {
        throw new Error(`Contact with wasn't added`);
      }
      console.table(newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with wasn't removed`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};
program
  .option('-a, --action, <type>', 'contacts operation')
  .option('-i, --id <type>', 'contact id')
  .option('-n, --name <type>', 'contact name')
  .option('-e, --email <type>', 'contact email')
  .option('-p, --phone <type>', 'contact phone');
program.parse(process.argv);
const options = program.opts();
console.log(options);
(async () => await invokeAction(options))();
