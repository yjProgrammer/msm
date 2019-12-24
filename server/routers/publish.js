var express = require('express');
var userModel = require('../db/dbuserModel');
var articlesModel = require('../db/dbarticlesModel');
var getdate = require('../utils/getdate');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('publish');
})

router.post('/pub', function (req, res) {
    userModel.findOne({ username: req.session.user.name }, function (err, data) {
        var article = new articlesModel({
            date: getdate(),
            title: req.body.title,
            content: req.body.content,
            author: data._id,
            scans: 0,
            comments: 0
        })
        article.save(function (err, artc) {
            if (err) {
                res.send('发布失败');
            } else {
                res.redirect('../index');
            } 
        })
    })
})



module.exports = router;