const { v4: uuidv4 } = require("uuid");
const { uploadFileToAmazonS3Bucket } = require("../services/amazon-s3-service");
const Constants = require("../constants/httpStatus");
const Message = require("../constants/message");

module.exports = {
  add: async function (req, res, cModel, oFields) {
    if (req.file) {
      oFields.image = await this.uploadImage(req);
    }

    cModel
      .create(oFields)
      .then(() => {
        res.status(Constants.CREATED).json(Message.CREATED);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },
  get: function (req, res, cModel) {
    cModel
      .findByPk(req.params.id)
      .then(() => {
        res.status(Constants.OK).json(oResult);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },
  getAll: function async(req, res, cModel) {
    cModel
      .findAll()
      .then((oResult) => {
        res.status(Constants.OK).res.json(oResult);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },
  getAllWithParam: async function (req, res, cModel, oParams) {
    cModel
      .findAll({
        where: oParams,
      })
      .then(() => {
        res.status(Constants.OK).json(oResult);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },
  modify: async function (req, res, cModel) {
    if (req.file) req.body.image = await this.uploadImage(req);
    cModel
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.status(Constants.OK).json(Message.MODIFIED);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },

  delete: function (req, res, cModel) {
    cModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((oResult) => {
        res.status(Constants.OK).json(Message.DELETED);
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Constants.INTERNAL_SERVER_ERROR)
          .json({ error: Message.INTERNAL_SERVER_ERROR, detail: e });
      });
  },
  uploadImage: async function (req, sFileName) {
    let sImage;
    if (!sFileName) sFileName = uuidv4();

    sImage = await uploadFileToAmazonS3Bucket(sFileName, req.file.buffer);
    return sImage;
  },
};
