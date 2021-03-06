	const express = require('express')
	const app = express()
	app.use(express.static("public"));
	var Datastore = require('nedb')
    var db = new Datastore({filename:'data.db',autoload:true});
    var mat;
    app.set("port",process.env.PORT||5000)
 
	app.set('view engine','ejs');
    app.get("/",function(req,res){
    	res.sendFile(__dirname+'/public/login.html')
    })
    app.get("/register",function(req,res){
    	res.sendFile(__dirname+'/public/register.html')
    })
    app.get("/login",function(req,res){
    	res.sendFile(__dirname+'/public/login.html')
    })
    app.get("/loginsubmit",function(req,res)
		{
			var pas=req.query.password;
			var em=req.query.email;	
			var person={
				"password":pas,
				"email":em
			}	
			var per={}
			db.find(person,function(err,result){

    		if(result.length!=0)
    		{
    			db.find(per,function(err1,res1){res.render("home",{result:res1})})
    			
    		}
    		else
    			res.send("No user found")
    	})	

		})
    app.get("/regsubmit",function(req,res)
		{
			var name=req.query.name;
			var pas=req.query.password;
			var em=req.query.email;
			var user=req.query.username;
			var person={
				"name":name,
				"password":pas,
				"email":em,
				"username":user
			}
			db.insert(person,function(err,result){
			})
			res.sendFile(__dirname+'/public/login.html');
		})
    app.get("/loginsubmit/:name",function(req,res){
    	var a=req.params.name;
    	db.find({username:a},function(err,result){
    		if(result.length!=0)
    			res.render("home",{result})
    		else
    			res.send("No user found")
    	})
    })
	app.listen(app.get('port'), function () 
		{
  			console.log('Open!!');
		});	