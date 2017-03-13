var express = require('express');
var mongojs = require('mongojs');

var router = express.Router();
var db = mongojs('mongodb://admin:123@ds129600.mlab.com:29600/mytasklist_mean', ['tasks']);

router.route('/tasks')
    .get((req, res, next) => {        
        db.tasks.find((err, tasks) => {
            if(err) throw err;
            res.json(tasks);
        });
    });

router.route('/task/:id')
    .get((req, res, next) => {        
        db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) },(err, task) => {
            if(err) throw err;
            res.json(task);
        });
    })
    .delete((req, res, next) => {
        db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) },(err, task) => {
            if(err) throw err;
            res.json(task);
        });
    })
    .put((req, res, next) => {
        var task = req.body;
        var updTask = {};

        if(task.isDone){
            updTask.isDone = task.isDone;
        }

        if(task.title){
            updTask.title = task.title;
        }

        if(!updTask){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        }else{
            db.tasks.update({ _id: mongojs.ObjectId(req.params.id) },
                            updTask, {}, (err, task) => {
                if(err) throw err;
                res.json(task);
            });
        }        
    });

router.route('/task')
    .post((req, res, next) => {
        var task = req.body;
        if(!task.title || !(task.isDone + '')){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        }else{
            db.tasks.save(task, (err, task) => {
                if(err) throw err;
                res.json(task);
            });
        }
    });

module.exports = router;