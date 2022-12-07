var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'todolist'
});

con.connect(function(error){
	if(error) throw error;
	else console.log('MySQL connected Successfully');
});

router.get("/", function(request, response, next){

	var query = "SELECT * FROM store ORDER BY id DESC";

	con.query(query, function(error, data){
		if(error) throw error; 
		else response.render('home', {title:'....Just to-do It....', action:'list', sampleData:data});
	});

});

router.get("/add", function(request, response, next){
	response.render("home", {title:'Add A New Task', action:'add'});
	console.log("New Task Insertion Created")
});

router.post("/add_sample_data", function(request, response, next){

	var enteredTask = request.body.first_name;
	var query = `INSERT INTO store (id,task) VALUES ("", "${enteredTask}")`;

	con.query(query, function(error, data){
		if(error) throw error;	
		else{
			console.log("Task Inserted "+"'"+request.body.first_name+"'");
			response.redirect("/home");
		}
	});
});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;
	var query = `SELECT * FROM store WHERE id = "${id}"`;

	con.query(query, function(error, data){
		console.log("Id "+request.params.id+"Selected for Update")
		response.render('home', {title: 'Edit this Tasks', action:'edit', sampleData:data[0]});
	});
});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;
	var editedTask = request.body.first_name;
	var query = `UPDATE store SET task = "${editedTask}" WHERE id = "${id}"`;

	con.query(query, function(error, data){
		if(error){
			throw error;
		}
		else{
			console.log("Updated id "+request.params.id+" With Data ->"+"'"+request.body.first_name+"'");
			response.redirect('/home');
		}
	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 
	var query = `DELETE FROM store WHERE id = "${id}"`;

	con.query(query, function(error, data){
		if(error){
			throw error;
		}
		else{
			console.log("Task Deleted "+"'"+request.params.id+"'");
			response.redirect("/home");
		}
	});
});

module.exports = router;