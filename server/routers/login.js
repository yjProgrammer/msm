var express = require('express');
var userModel = require('../db/dbuserModel');
var router = express.Router();

router.get('/', function(req, res) {
    res.json('ojbk, 连上后端');
})

router.post('/', function(req, res) {
    console.log(req.body);
    userModel.find({username: req.body.username},function(err, data) {
        if(data.length > 0) {
            var flag = false;
            for(var i = 0; i < data.length; i++) {
                if(data[i].password == req.body.password) {
                    flag = true;
                    break;
                }
            }
            if(flag) {
                res.json({login: true});
            } else {
                res.json({login: false});
            }
        } else {
            res.json({login: false});
        }
    })
})

module.exports = router;