const News= require("../models/news");

module.exports={

    addNews:async (req, res) => {
        News.create({
            name: req.body.title,
            content: req.body.content,
            image:req.body.image,
        }).then(News => {
            res.json(News)})
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    getNews:async (req, res) => {
        News.findByPk(req.params.id)
        .then(News => {
            res.json(News);   
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    getAllNews:async  (req, res) => {
        News.findAll().then(News => {
            res.json(News);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    modifyNews:async (req, res) => {
        News.update({
            name: req.body.title,
            content: req.body.content,
            image:req.body.image
        }, {
            where: {
                id: req.params.id
            }})
        .then(result => {
            res.json(result);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    deleteNews: async (req, res) => {
        News.destroy({
            where: {
                id: req.params.id
            }})
        .then(result => {
            res.json(result);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    }

}