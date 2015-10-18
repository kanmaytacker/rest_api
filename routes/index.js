var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var bear=mongoose.model('BearSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/bears',function(req,res){
	bear.find(function(err,bears,count){
		console.log('bears');
		res.render('bears',{
			title:'Bears',
			bears:bears
		});
	});
});

router.get('/api/bears/:bear_id',function(req,res){
	bear.findById(req.params.bear_id,function(err,bes){
		console.log(bes.name);
		res.render('bears',{
			title:'Bear By Id',
			bears:bes
		});
	});
});

router.post('/api/bears',function(req,res){
	new bear({
		name:req.body.name
	}).save(function(err,bear,count){
		console.log('Bear created with name :',bear.name);
		res.redirect('bears');
	});
});




router.delete('/api/bears/:bear_id',function(req,res){
	bear.remove({
		_id:req.params.bear_id
	},function(err,bear){
		if(err)
			res.send(err);
		console.log('Deleted '+bear);
		res.json({msg :'Done'});
		

	});
});
module.exports = router;
