module.exports = {
  list: (req, res, next) => {
    try {
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  find: (req, res, next) => {
    try {
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  create: (req, res, next) => {
    try {
      const result = null;

      return res.status(201).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  update: (req, res, next) => {
    try {
      const result = null;

      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  delete: (req, res, next) => {
    try {
      const result = null;
      
      return res.status(200).send(result);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};
