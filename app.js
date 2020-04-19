var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());							// Parsing JSON
app.use(bodyParser.urlencoded({extended: true}));	
app.use(express.static(__dirname + '/public'));		// Directory for CSS files
app.use(express.static(__dirname + '/views'));		// Director for HTML files

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(3000, function(){
	console.log("Server is listening on Port 3000");
});