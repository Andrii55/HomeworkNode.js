const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts(req, res) {
  try {
    const contactsData = JSON.parse(await fs.readFile(contactsPath));
    if (contactsData) {
      res.status(200).json(contactsData);
    } else {
      res.status(404).json({ error: null });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const contactsData = JSON.parse(await fs.readFile(contactsPath));
    const contact = contactsData.find((contact) => String(contact.id) === id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: null });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function removeContact(req, res) {
  try {
    const { id } = req.params;
    const contactsData = JSON.parse(await fs.readFile(contactsPath));
    const updatedContacts = contactsData.filter(
      (contact) => String(contact.id) !== id
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    if (contactsData) {
      res.status(200).json(updatedContacts);
    } else {
      res.status(404).json({ error: null });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function addContact(req, res) {
  try {
    const { body } = req;
    const contactsData = JSON.parse(await fs.readFile(contactsPath));
    const newContact = { ...body, id: crypto.randomUUID() };
    contactsData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsData));

    if (contactsData) {
      res.status(200).json(newContact);
    } else {
      res.status(404).json({ error: null });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
