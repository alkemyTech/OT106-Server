const { v4: uuidv4 } = require('uuid');
const {uploadFileToAmazonS3Bucket}=require("../services/amazon-s3-service")
const Constants= require("../constants/httpStatus");

module.exports={

    add:async function (req,res,cModel,oFields){

        if(req.file) {
            oFields.image=await this.uploadImage(req)
        }

        cModel.create(oFields)
        .then(oResult => {
            res.json(oResult)
            res.status(Constants.CREATED);
        })
        .catch(e => {
            console.log(e);
            res.status(Constants.INTERNAL_SERVER_ERROR);
        })
    },
    get: (req, res,cModel) => {
        cModel.findByPk(req.params.id)
        .then(oResult => {
            res.json(oResult)
            res.status(Constants.OK);
        })
        .catch(e => {
            console.log(e);
            res.status(Constants.INTERNAL_SERVER_ERROR);
        })
    },
    getAll: async (req, res,cModel) => {
        cModel.findAll()
        .then(oResult => {
            res.json(oResult)
            res.status(Constants.OK);
        })
        .catch(e => {
            console.log(e);
            res.status(Constants.INTERNAL_SERVER_ERROR);
        })
    },

    modify: async function (req, res,cModel) {
        if(req.file) req.body.image= await this.uploadImage(req);
        cModel.update(req.body, {
            where: {
                id: req.params.id
            }})
        .then(oResult => {
                res.json(oResult)
                res.status(Constants.OK);
            })
        .catch(e => {
            console.log(e);
            res.status(Constants.INTERNAL_SERVER_ERROR);
        })
    },

    delete: (req, res, cModel) => {
        cModel.destroy({
            where: {
                id: req.params.id
            }})
        .then(oResult => {
                res.json(oResult)
                res.status(Constants.OK);
            })
        .catch(e => {
            console.log(e);
            res.status(Constants.INTERNAL_SERVER_ERROR);
        })
    },
    uploadImage: async function(req,sFileName){
        let sImage;
        if(!sFileName) sFileName= uuidv4();

        sImage = await uploadFileToAmazonS3Bucket(
            sFileName, req.file.buffer
        );
        return sImage; 
        
    }
}