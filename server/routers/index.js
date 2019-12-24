var express = require('express');
var router = express.Router();
var articlesModel = require('../db/dbarticlesModel');

router.get('/', function (req, res) {
    articlesModel.find({}, function (err, data) {
        if (err) {
            console.log('全部文章获取错误');
        } else {
            // articlesModel.find({}).populate('author').exec(function(err, d) {
            //     console.log(d);
            // })
            function getarticle(callback) {
                var arts = [];
                for (var i = data.length - 1; i >= 0; i--) {
                    articlesModel.findOne({ _id: data[i]._id }).populate('author', 'username photo').exec(function (err, act) {
                        var article = {
                            id: act._id,
                            date: act.date,
                            title: act.title,
                            content: act.content,
                            authorid: act.author._id,
                            authorname: act.author.username,
                            authorphoto: act.author.photo,
                            scans: act.scans,
                            comments: act.comments
                        }
                        arts.push(article);
                        if(arts.length == data.length) {
                            callback(arts);
                        }
                    })
                }
            }
            getarticle(function(articles) {
                // console.log(articles.length);
                // console.log(articles.length / 3 + 1);
                if (req.session.user) {
                    res.render('index', { isLogin: req.session.user.isLogin, id: req.session.user.id,  username: req.session.user.name, articles});
                } else {
                    res.render('index', { isLogin: false, id: null, username: null, articles});
                }
            }) 
        }
    })

})

module.exports = router;