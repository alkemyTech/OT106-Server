const { v4: uuidv4 } = require("uuid");
const { uploadFileToAmazonS3Bucket } = require("../services/amazon-s3-service");
const Constants = require("../constants/httpStatus");
const Message = require("../constants/message");
const paginate = require('../services/paginate');


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
  getAllWithPagination: async function (req,res,cModel,sEntity,nLimit=10){
    try{
    const nPage = parseInt(req.query.page);
    const model = await this.getAllWithPaginationReq(parseInt(req.query.page),nLimit,cModel);

    if (!model.rows[0]) return res.status(Constants.NOT_FOUND).json(Message.NOT_FOUND);

    if (nPage > 0) model.previousPage = `${req.protocol}://${req.get('host')}/${sEntity}/?page=${nPage - 1}`

    if (nPage < model.totalPages - 1) model.nextPage = `${req.protocol}://${req.get('host')}/${sEntity}/?page=${nPage + 1}`;
    
    res.status(Constants.OK).json(model);
  }
  catch(e){
    res.status(Constants.INTERNAL_SERVER_ERROR).json(Message.INTERNAL_SERVER_ERROR);
    throw new Error({ error: Message.INTERNAL_SERVER_ERROR, detail: error })
  }
  },
  getAllWithPaginationReq:async function(page,nLimit,cModel){
    
      try{
      const list = await cModel.findAndCountAll({
        limit:nLimit,
        offset: page * nLimit,
        paranoid: false,
      });

      //Return object to service
      const {rows} = list;
      const totalPages = Math.ceil(list.count / nLimit);
    
      const result = {
        totalPages,
        rows
      }

      return result;
    }
    catch(e){
      res.status(Constants.INTERNAL_SERVER_ERROR).json(Message.INTERNAL_SERVER_ERROR);
      throw new Error({ error: Message.INTERNAL_SERVER_ERROR, detail: error })
    }
  
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
