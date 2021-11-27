// [!] Keep this and where it's used commented until user-service exists
// const { UserService } = require('../service/user-service');

/**
 * try-catch blocks could be ommited if a general catch is implemented
 * i.e.,
 * const responseCatch = (fn) => (req, res, next) => {
 *   try {
 *     fn(req, res, next);
 *   } catch (err) {
 *     console.error(err);
 *     return res.sendStatus(500);
 *   }
 * };
 */

// Also, the http response status code could be imported from another file

module.exports = {
  list: async (req, res, next) => {
    try {
      // TODO: Send to the service the filters of the search
      // const result = UserService.list();
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  find: async (req, res, next) => {
    try {
      // TODO: Send to the service the id of the user
      // const result = UserService.find();
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  create: async (req, res, next) => {
    try {
      // TODO: Send to the service the properties to create it
      // const result = UserService.create();
      const result = null;

      return res.status(201).send(result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  update: async (req, res, next) => {
    try {
      // TODO: Send to the service the properties to update it
      // const result = UserService.update();
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  delete: async (req, res, next) => {
    try {
      // TODO: Send to the service the id to delete it
      // const result = UserService.delete();
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },
};
