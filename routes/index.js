var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var cmdCheck = "top -l 1 | grep 'CPU usage'";
var cmdCheckDocker = "top -b -n 1 | grep %Cpu\\(s\\):"
var cmdAdd = "stress -c 1 -t 60 &";

//excute the bash command


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/check',function(req,res,next) {
  exec(cmdCheck, function(error,stdout,stderr){
    console.log(stdout);
    var resultArray = stdout.match(/[0-9.]*%/gi);
    //console.log(resultArray[0].slice(0,3));
    var cpuUsages={};
    //resultArray[0].pop();
    cpuUsages.usr = resultArray[0].slice(0,resultArray[0].length-1);
    //resultArray[1].pop();
    cpuUsages.sys = resultArray[1].slice(0,resultArray[1].length-1);
    res.send(cpuUsages);
    //res.render('index', { title: resultArray[0] });
  })
});

router.get('/checkDocker',function(req,res,next) {
    console.log('cmd input:'+cmdCheckDocker+'\n');
  exec(cmdCheckDocker, function(error,stdout,stderr){
    console.log('cmd output:'+stdout+'\n');
    var resultArray = stdout.match(/[0-9\.]+/gi);
    console.log('filter output:'+resultArray+'\n'+'\n');
    var cpuUsages={};
    cpuUsages.usr = resultArray[0];
    cpuUsages.sys = resultArray[1];
    console.log(cpuUsages+'\n');
    res.send(cpuUsages);
    //res.render('index', { title: resultArray[0] });
  })
});

router.get('/add',function(req,res,next){
  exec(cmdAdd, function(error,stdout,stderr){
    console.log(stdout);
    res.send('');
  })
});

router.get('/test',function(req,res){
  res.render('error',{});
})

module.exports = router;
