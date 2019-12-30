const Usuario = require('./../models/usarioModel.js')

module.exports.insertarUsuario = (callback)=>{
	
	let u = new Usuario({id:99,usuario:'Fernanda Silva',pass:'1234'})
	
	u.save((error)=>{
		if(error)
			callback(error,null);

		callback(null,'Insert ejecutado correctamente');
	});
};

module.exports.existeUsuario = (nomUsr,contrasena,callback) =>{

	existe = Usuario.exists({nombre:nomUsr,pass:contrasena});
	callback(existe);
}
