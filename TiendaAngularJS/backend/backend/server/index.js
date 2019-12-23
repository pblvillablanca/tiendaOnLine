const	http = require('http')
	express = require('express')
	mongoose = require('mongoose')
	OperacionesUsuario = require('./../bd/OperacionesUsuario.js')
	Router = require('./Router.js')
	bodyParser = require('body-parser')	

const	PORT = 8080,
	URL_DB = 'mongodb://localhost/tienda'
	app = express();
	server = http.createServer(app)

mongoose.connect(URL_DB)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());


app.use('/',Router)

server.listen(PORT,()=>console.log('El servidor iniciado correctamente'))

/*OperacionesUsuario.insertarUsuario((error,result)=>{
	
	if(error)
		console.log(error);
	
	console.log(result);
})*/

/*OperacionesUsuario.existeUsuario('pablo','vil176',(existe)=>{
	
	existe.then(value=>console.log(value))
});*/
