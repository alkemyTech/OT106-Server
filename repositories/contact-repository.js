const db = require("../models/index");
const pick = require("../functions/pick");

const createContact = async (req) => {
  let { name, phone, email, message } = req.body;

  const create = await db.sequelize.transaction(async (t) => {
    const contact = await db.Contact.create(
      {
        name,
        phone,
        email,
        message,
      },
      {
        transaction: t,
      }
    );

    return contact;
  });

  return create;
};

const getContacts = async () => {
  const contacts = await db.Contact.findAll({
    paranoid: false,
  });
  return contacts;
};

const getContactById = async (id) => {
  const contact = await db.Contact.findOne({
    where: { id },
    paranoid: false,
  });

  return contact;
};

const updateContact = async (req) => {
  let { id } = req.params;
  let { body } = req;
  let updateBodyObject = pick(body, Object.keys(body));

  await db.sequelize.transaction(async (t) => {
    const contact = await db.Contact.update(updateBodyObject, {
      where: { id },
      transaction: t,
    });
    return contact;
  });

  const update = await db.Contact.findOne({
    where: { id },
  });
  return update;
};

const deleteContact = async (id) => {
  const remove = await db.sequelize.transaction(async (t) => {
    const deletedContact = await db.Contact.destroy({
      where: { id },
      transaction: t,
    });
    return deletedContact;
  });

  return remove;
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
