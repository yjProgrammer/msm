var express = require('express');
var userModel = require('../db/dbuserModel');
var multer = require('multer');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('register');
})

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'views/images/')
    },
    filename: function(req, file, cb) {
        var oname = file.originalname;
        var hzarr = oname.split('.');
        var hz = hzarr[hzarr.length - 1];
        var str = '';
        for(var i = 0; i < hzarr.length - 1; i ++) {
            str += hzarr[i] + '.';
        }
        cb(null, str + hz);
    }
})

var upload = multer({storage: storage});

router.post('/reg', upload.single('avatar'), function(req, res) {
    var user = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        photo: req.file.originalname,
        personinfo: req.body.personinfo
    })
    user.save(function(err, data) {
        if(err) {
            res.send('上传数据库失败');
        } else {
            var people = {
                name: data.username,
                id: data._id,
                isLogin: true
            }
            req.session.user = people;
            res.redirect('../index');
        }
    })
})

module.exports = router;