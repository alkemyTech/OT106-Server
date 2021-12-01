const News= require("../models/news");

module.exports={

    addNews:async (req, res) => {//TODO (S3 ready) Adaptar S3 a la subida de image
        News.create({
            name: req.body.title,
            content: req.body.content,
            image:req.body.image,
            type:"news"
        }).then(News => {
            res.json(News);
            res.status(201);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    getNews:async (req, res) => {
        News.findByPk(req.params.id)
        .then(News => {
            res.json(News); 
            res.status(200);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    },

    getAllNews:async  (req, res) => {
        News.findAll().then(News => {
            res.status(200);
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
            res.status(200);
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
            res.status(200);
            res.json(result);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        })
    }

}