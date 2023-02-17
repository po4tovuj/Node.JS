const { writeFileSync, readFileSync, appendFileSync } = require('fs');
const { v4 } = require('uuid');

const path = require('path');
const contactsPath = path.resolve('db/contacts.json');
const getContacts = () => {
  const data = readFileSync(contactsPath, 'utf-8');
  return JSON.parse(data) || null;
};
const showContacts = async () => {
  try {
    const data = await getContacts();
    return data;
  } catch (error) {
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const lookedContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    return lookedContact;
  } catch (error) {
    return null;
  }
};

removeContact = async (contactId) => {
  const contacts = await getContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  try {
    writeFileSync(contactsPath, JSON.stringify(newContacts));
    const removedContact = contacts.find((contact) => contact.id === contactId);

    return removedContact;
  } catch (err) {
    console.error(` contact wasn't removed! ${err}`);
  }
};

const addContact = async (name, email, phone) => {
  const contact = {
    name,
    email,
    phone,
    id: v4(),
  };
  try {
    const contacts = await getContacts();
    contacts.push(contact);
    writeFileSync(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    return null;
  }
};
module.exports = {
  showContacts,
  getContactById,
  addContact,
  removeContact,
};
