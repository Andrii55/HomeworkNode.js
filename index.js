const express = require("express");
const contactFunctions = require("./contacts");

const app = express();

app.use(express.json());

app.listen(3001, () => console.log("Server is running on port 3001..."));

app.get("/contacts", contactFunctions.listContacts);

app.get("/contact/:id", contactFunctions.getContactById);

app.delete("/contact/:id", contactFunctions.removeContact);

app.post("/contact", contactFunctions.addContact);
