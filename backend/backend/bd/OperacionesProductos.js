const Producto = require('./../models/productoModel.js');

module.exports.buscarTodosProductos = (callback)=>{
	
	Producto.find((err,docs)=>{
		
		callback(docs);
	})

}


module.exports.buscarProductoMatch = (nom, callback) => {

	 Producto.find({ nombre: { $regex: nom, $options: "i" } }, function(err, docs) {
	
		callback(docs);
	})

}


module.exports.obtenerProductoPorNombre = (nom,callback) =>{

	Producto.find({nombre:nom},(err,docs)=>{
	
		callback(docs);
	})
}
