const db = require('../models');
const baseRepository = require("../repositories/_base-repository");


module.exports={

    addCommentary:async (req, res) => {
        
        const oFields= {
            body: req.body.body,
            UserId: req.body.UserId,
            NewsId:req.body.NewsId
        }
        await baseRepository.add(req,res,db.Commentary,oFields)
    },

    getCommentary:async (req, res) => {
        baseRepository.get(req,res,db.Commentary);
    },

    getAllCommentaries:async  (req, res) => {
        const oFields= {
            NewsId:req.body.NewsId
        }
        baseRepository.getAllWithParam(req,res,db.Commentary,oFields)
    },

    modifyCommentary:async (req, res) => {

        baseRepository.modify(req,res,db.Commentary)
    },

    deleteCommentary: async (req, res) => {
        baseRepository.delete(req,res,db.Commentary)
    }

}