const 	express = require('express')
	Router = express.Router()
	OperacionesUsuario = require('./../bd/OperacionesUsuario.js')
	OperacionesProductos = require('./../bd/OperacionesProductos.js');
	OperacionesProductoCarrito = require('./../bd/OperacionesProductoCarrito.js');

Router.post('/existeUsuario/pablo',(req,res)=>{
	
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	let jsonRequest = JSON.parse(req.body);

	let usr = jsonRequest.usuario;
        let pass = jsonRequest.pass;

	OperacionesUsuario.existeUsuario(usr, pass, (existe) => {
		
		existe.then(value=>{

			
			if(value)
				res.json({'status':200});
			else
				res.json({'status':404});

			
		})
	
	});
	
})


Router.post('/buscarProductoMatch',(req,res)=>{

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let jsonRequest = JSON.parse(req.body);

        let nombre = jsonRequest.nombre;
	
	OperacionesProductos.buscarProductoMatch(nombre,(docs)=>{
		res.json(docs);
	})

})


Router.get('/obtenerProductos',(req,res)=>{

	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	OperacionesProductos.buscarTodosProductos((docs)=>{
		
		res.json(docs);
	})

});


Router.post('/obtenerProducto',(req,res)=>{

	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	let jsonRequest = JSON.parse(req.body);

	let nombre = jsonRequest.nombre;

	OperacionesProductos.obtenerProductoPorNombre(nombre,(docs)=>{
	
		res.json(docs);
	})
})


Router.post('/agregarCarrito',(req,res)=>{
	
	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let jsonRequest = JSON.parse(req.body);
	
	let numero = jsonRequest.numero;
	let nombre = jsonRequest.nombre;
	let precio = jsonRequest.precio;
	let subtotal = jsonRequest.subtotal;

	OperacionesProductoCarrito.agregarProductoCarrito(numero,nombre,precio,subtotal,(result)=>{
		res.json(result);
	});

})

Router.get('/obtenerNumProdCarrito',(req,res)=>{


	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


	OperacionesProductoCarrito.numProductosCarrito((result) => {
		res.json({count:result});
	});
})

Router.get('/obtenerProductosCarrito',(req,res) => {

	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	OperacionesProductoCarrito.obtenerProductosCarrito((result)=>{
		
		let resJsonVacio = {
			productos:[]
		}
		if(result.length == 0){
			res.json({"productos":[]});
		}else{
			resJsonVacio.productos.push(result);
			res.json(resJsonVacio);
		}
	})
})


Router.get('/eliminarProductosCarrito',(req,res)=>{
	
	res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	 OperacionesProductoCarrito.eliminarProductosCarrito((result)=>{

                res.json(result);
        })

})

module.exports = Router
