const ProductoCarrito = require('./../models/productoCarritoModel.js');

module.exports.agregarProductoCarrito = (num,nom,prec,sub,callback) =>{
	
	
	ProductoCarrito.find({nombre:nom},(err,docs)=>{
	
		if(docs.length > 0){
			let count = parseInt(docs[0].numero) + parseInt(num);

			let subtotal = parseInt(docs[0].precio) * parseInt(count);
			
			ProductoCarrito.findOneAndUpdate({nombre:'Aguacate'},{$set: {numero:count,'subtotal':subtotal}},( error, result)=>{
				if(error)
					console.log(error);
			});
		}else{
		
			 let productoCarrito = new ProductoCarrito({
		                numero:num,
                		nombre:nom,
		                precio:prec,
				subtotal:sub
        		})

        		productoCarrito.save((err) => {
                		if(err)
                        		callback(err);

                	callback({'status':200});
        		});

		}
	})

}

module.exports.numProductosCarrito = (callback)=>{


	/*ProductoCarrito.estimatedDocumentCount((err,count)=>{
		
		if(err)
			callback(0);

		callback(count);
	});*/

	let count=0;

	ProductoCarrito.find((err,docs)=>{
		
		if(err)
			callback(0);

		docs.forEach((value)=>{
			count = parseInt(count) + parseInt(value.numero);
		})
		
		callback(count);
	})


}

module.exports.obtenerProductosCarrito = (callback) => {
	
	ProductoCarrito.find((err,docs)=>{
	
		if(err)
			callback(err);

		callback(docs);
	})
}


module.exports.eliminarProductosCarrito = (callback) => {

	   ProductoCarrito.deleteMany((err,docs)=>{

                if(err)
                        callback(err);

                callback({status:200});
        })

}
