var express = require('express');
var router = express.Router();
var getdate = require('../utils/getdate');
var articlesModel = require('../db/dbarticlesModel');
var commentsModel = require('../db/dbcommentsModel');
var userModel = require('../db/dbuserModel');


router.get('/:id', function (req, res) {
    articlesModel.findOne({ _id: req.params.id }, function (err, art) {
        var article = art;
        article.scans = art.scans + 1;
        // console.log(article);
        articlesModel.findOneAndUpdate({ _id: req.params.id }, article, function (err, suc) {
            if (err) {
                res.send('浏览量刷新失败');
            } else {
                console.log('浏览量刷新成功');
            }
        })
    })
    articlesModel.findOne({ _id: req.params.id }).populate('author', 'username photo').exec(function (err, data) {
        if (err) {
            res.send('获取说说信息失败');
        } else {
            // console.log(req.params.id);
            function getComment(callback) {
                commentsModel.find({ source: req.params.id }).populate('source', '_id').populate('author', 'username photo').exec(function (err, coms) {
                    // commentsModel.find({source: req.params.id}, function (err, coms) {
                    if (err) {
                        console.log('评论查找失败');
                    } else {
                        // console.log(coms);
                        var comments = [];
                        for (var i = 0; i < coms.length; i++) {
                            var comment = {
                                content: coms[i].content,
                                date: coms[i].date,
                                id: coms[i]._id,
                                commentperson: coms[i].author.username,
                                commentphoto: coms[i].author.photo,
                                commentperid: coms[i].author._id
                            }
                            comments.push(comment);
                        }
                        callback(comments);
                    }
                })
            }
            getComment(function (com) {
                // console.log(com);
                if (com.length == 0) {
                    var coml = './ejsComponent/commentnone';
                    if (req.session.user) {
                        res.render('comment', { userid: req.session.user.id, id: req.params.id, comment: data, isLogin: true, coml: coml });
                    } else {
                        res.render('comment', { userid: null, id: req.params.id, comment: data, isLogin: false, coml: coml });
                    }
                } else {
                    var coml = './ejsComponent/commentlist';
                    if (req.session.user) {
                        console.log(data);
                        console.log(req.session.user.id);
                        res.render('comment', { userid: req.session.user.id, id: req.params.id, comment: data, isLogin: true, comments: com, coml: coml });
                    } else {
                        res.render('comment', { userid: null, id: req.params.id, comment: data, isLogin: false, comments: com, coml: coml });
                    }
                }
            })
        }
    })
})

router.post('/:id', function (req, res) {
    // 登录用户信息
    userModel.findOne({ _id: req.session.user.id }, function (err, per) {
        if (err) {
            res.send('查找登录用户失败');
        } else {
            // 文章信息
            articlesModel.findOne({ _id: req.params.id }, function (error, art) {
                if (error) {
                    res.send('查找被评论文章失败');
                } else {
                    var comment = new commentsModel({
                        date: getdate(),
                        content: req.body.content,
                        source: art._id,   //关联文章数据库
                        author: per._id    //关联用户数据库
                    })
                    comment.save(function (fail, suc) {
                        if (fail) {
                            res.send('评论存库失败');
                        } else {
                            // articlesModel.findOne({ _id: req.params.id }, function (err, art) {
                            var article = art;
                            article.comments = art.comments + 1;
                            // console.log(article);
                            articlesModel.findOneAndUpdate({ _id: req.params.id }, article, function (err, suc) {
                                if (err) {
                                    res.send('评论量刷新失败');
                                } else {
                                    console.log('评论量刷新成功');
                                }
                            })
                            // })
                            // console.log(art);
                            res.redirect('../index');
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;