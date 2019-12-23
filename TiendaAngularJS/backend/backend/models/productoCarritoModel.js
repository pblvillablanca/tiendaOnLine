const 	mongoose = require('mongoose');


const Schema = mongoose.Schema;

const SchemaProdCarrito = new Schema({
	
	numero:{type:String, required:true},
	nombre:{type:String, required:true},
	precio:{type:String, required:true},
	subtotal:{type:String, required:true}
})

const ProductoCarrito = mongoose.model('ProductoCarrito',SchemaProdCarrito);

module.exports = ProductoCarrito;
