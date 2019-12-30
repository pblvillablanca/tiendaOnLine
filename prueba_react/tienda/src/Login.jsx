import React from 'react';
import './Login.css';
import * as request from 'superagent';
import {  Redirect } from "react-router-dom";


class Login extends React.Component{

	constructor(){
		super()
		this.state = {
			usuario:'',
			pass:'',
			classUsuario:'normal',
			classPass:'normal',
			loginCorrecto:false
		}

		this.cambioUsuario = this.cambioUsuario.bind(this);
		this.cambioPass = this.cambioPass.bind(this);
		this.login = this.login.bind(this);
	}

	render(){

		if(this.state.loginCorrecto){
			return <Redirect to='/Home' />
		}else{
			return(
				<div className="container">
					<h3>Login</h3>
					<form onSubmit={this.login} >
						<input type="text" className={this.state.classUsuario}  placeholder="Ingrese Usuario" value={this.state.usuario} onChange={this.cambioUsuario} />
						<input type="password" className={this.state.classPass} placeholder="Ingrese Contraseña" value={this.state.pass} onChange={this.cambioPass}  />
						<div>
							<label className="text-error" id="errorUsuario">No existe Usuario</label>
						</div>
						<button className="btn">Enviar</button>
					</form>
				</div>
			)
		}
	}

	login(e){
		e.preventDefault();

		if(!this.state.usuario.length || !this.state.pass.length){
			
			this.setState({classUsuario:'error'});
			this.setState({classPass:'error'});

			return;
		}
	
		request.post('http://localhost:8080/existeUsuarioRc').send({"usuario":this.state.usuario, "pass":this.state.pass}).end((err,res)=>{
		
			if(err || !res.ok)
				console.log('Error!' + e);

			if(res.body.status === 200)
				this.setState({loginCorrecto:true});
			else{
				let labelError = document.getElementById("errorUsuario");
				labelError.style.display = "inline";
			}
		})
	}

	cambioUsuario(e){
	
		this.setState({usuario : e.target.value})

		if(!this.state.usuario.length)
			this.setState({classUsuario:'error'})
		else
			this.setState({classUsuario:'normal'})
	}

	cambioPass(e){
		
		this.setState({pass : e.target.value})

		if(!this.state.pass.length)
			this.setState({classPass:'error'})
		else
			this.setState({classPass:'normal'})
	
	}
}

export default Login;
