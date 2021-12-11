const db = require('../models');
const baseRepository = require("../repositories/_base-repository");


module.exports={

    addNews:async (req, res) => {
        
        const oFields= {
            name: req.body.name,
            content: req.body.content,
            categoryId:req.body.categoryId?req.body.categoryId:null
        }
        await baseRepository.add(req,res,db.News,oFields)
    },

    getNews:async (req, res) => {
        baseRepository.get(req,res,db.News);
    },

    getAllNews:async  (req, res) => {
        baseRepository.getAll(req,res,db.News)
    },

    modifyNews:async (req, res) => {

        baseRepository.modify(req,res,db.News)
    },

    deleteNews: async (req, res) => {
        baseRepository.delete(req,res,db.News)
    }

}