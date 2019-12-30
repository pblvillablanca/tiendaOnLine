const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
	id:{type:Number, required:true},
	usuario:{type:String, required:true},
	pass:{type:String,required:true}
})

const Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = Usuario;
