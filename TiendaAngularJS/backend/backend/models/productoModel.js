const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productosSchema = new Schema({
	nombre:{type:String, required:true},
	precio:{type:Number, required:true},
	unidades:{type:Number, required:true},
	imagen:{type:String, required:true},
})

const Producto = mongoose.model('Producto',productosSchema);

module.exports = Producto;
