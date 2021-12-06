const {uploadFileToAmazonS3Bucket}=require("../services/amazon-s3-service")
const Constants= require("../constants/httpStatus");

module.exports={

    add:(req,res,cModel,oFields)=>{
        
        if(req.file) oFields.image= this.uploadImage(req)

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

    modify: (req, res,cModel,oFields) => {

        if(req.file) oFields.image= this.uploadImage(req,oFields)
        
        cModel.update(oFields, {
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
    uploadImage: async function(req){
            let image;
            let file = req.file.originalname.split(".");
            const fileType = file[file.length - 1];
            image = await uploadFileToAmazonS3Bucket(
                req.file.buffer,
                fileType,
                req.body.name.toLowerCase()
            );
            return image    
        
    }

}