var express = require('express');
var articlesModel = require('../db/dbarticlesModel');
var commentsModel = require('../db/dbcommentsModel');

var router = express.Router();

router.get('/:id', function (req, res) {
    // console.log(req.params.id);
    articlesModel.findOneAndDelete({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.send('删除失败');
        } else {
            commentsModel.remove({ source: req.params.id }, function (err, coms) {
                console.log(coms);
            })
            res.redirect('../index');
        }
    })
})

module.exports = router;