const { v4: uuidv4 } = require('uuid');
const { uploadFileToAmazonS3Bucket } = require('../services/amazon-s3-service');
const Constants = require('../constants/httpStatus');
const Message = require('../constants/message');
const throwError = require('../functions/throw-error');

module.exports = {
  async add(req, res, cModel, oFields) {
    if (req.file) {
      oFields.image = await this.uploadImage(req);
    }

    cModel
      .create(oFields)
      .then(() => {
        res.status(Constants.CREATED).json({ message: Message.CREATED });
      })
      .catch((e) => {
        console.log(e);
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },
  get(req, res, cModel) {
    cModel
      .findByPk(req.params.id)
      .then((oResult) => {
        res.status(Constants.OK).json({ message: Message.OK, body: oResult });
      })
      .catch((e) => {
        console.log(e);
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },
  getAll: function async(req, res, cModel) {
    cModel
      .findAll()
      .then((oResult) => {
        res.status(Constants.OK).res.json({ message: Message.OK, body: oResult });
      })
      .catch((e) => {
        console.log(e);
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },
  async getAllWithPagination(req, res, cModel, sEntity, nLimit = 10) {
    try {
      const nPage = parseInt(req.query.page);
      const model = await this.getAllWithPaginationReq(parseInt(req.query.page), nLimit, cModel);

      if (!model.rows[0]) return res.status(Constants.NOT_FOUND).json(Message.NOT_FOUND);

      if (nPage > 0) model.previousPage = `${req.protocol}://${req.get('host')}/${sEntity}/?page=${nPage - 1}`;

      if (nPage < model.totalPages - 1) model.nextPage = `${req.protocol}://${req.get('host')}/${sEntity}/?page=${nPage + 1}`;

      res.status(Constants.OK).json({ message: '', body: model });
    } catch (e) {
      console.log(e);
      return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
    }
  },
  async getAllWithPaginationReq(page, nLimit, cModel) {
    try {
      const list = await cModel.findAndCountAll({
        limit: nLimit,
        offset: page * nLimit,
        paranoid: false,
      });

      // Return object to service
      const { rows } = list;
      const totalPages = Math.ceil(list.count / nLimit);

      const result = {
        totalPages,
        rows
      };

      return result;
    } catch (e) {
      console.log(e);
      return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
    }
  },
  async getAllWithParam(req, res, cModel, oParams) {
    cModel
      .findAll({
        where: oParams,
      })
      .then(() => {
        res.status(Constants.OK).json({ message: Message.OK, body: oResult });
      })
      .catch((e) => {
        console.log(e);
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },
  async modify(req, res, cModel) {
    if (req.file) req.body.image = await this.uploadImage(req);
    cModel
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        res.status(Constants.OK).json({ message: Message.MODIFIED });
      })
      .catch((e) => {
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },

  delete(req, res, cModel) {
    cModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((oResult) => {
        res.status(Constants.OK).json({ message: Message.DELETED });
      })
      .catch((e) => {
        console.log(e);
        return throwError(Constants.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR);
      });
  },
  async uploadImage(req, sFileName) {
    let sImage;
    if (!sFileName) sFileName = uuidv4();

    sImage = await uploadFileToAmazonS3Bucket(sFileName, req.file.buffer);
    return sImage;
  },
};
