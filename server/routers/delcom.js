var express = require('express');
var articlesModel = require('../db/dbarticlesModel');
var commentsModel = require('../db/dbcommentsModel');

var router = express.Router();

router.get('/:id', function (req, res) {
    commentsModel.findOneAndDelete({ _id: req.params.id }, function (err, coms) {
        articlesModel.findById(coms.source, function(err, art) {
            var article = art;
            article.comments = art.comments - 1;
            articlesModel.updateOne({_id: coms.source}, article, function(err, update) {
                console.log(update);
            })
        })
    })
    res.redirect('../index');
})

module.exports = router;