var express = require('express');
var articlesModel = require('../db/dbarticlesModel');

var router = express.Router();

router.get('/:id', function (req, res) {
    articlesModel.findOne({ _id: req.params.id }).populate('author', '_id username photo').exec(function (err, act) {
        const id = act.author._id;
        articlesModel.find({ author: id }).populate('author', 'username photo').exec(function (err, data) {
            // console.log(data);
            if (req.session.user) {
                // console.log(data);
                res.render('person', {data,id: req.session.user.id,username: req.session.user.name, isLogin: req.session.user.isLogin});
            } else {
                res.render('person', {data,id:null,username: null, isLogin: false});
            }
        })
        // }
    })
})

module.exports = router;