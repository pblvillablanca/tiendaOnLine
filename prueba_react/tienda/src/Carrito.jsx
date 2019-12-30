import React from 'react';
import Barra from './Barra.jsx';
import * as request from 'superagent';
import { Link } from "react-router-dom";


class Carrito extends React.Component{

	constructor(){
		super()

		this.state = {
			
			productos:[],
			totalPagar:0
		}

		this.obtenerProductosCarrito();
		this.pagar = this.pagar.bind(this);
	}

	render(){
	
		return(
			<div>
				<Barra />
				<div className="container">
					<h4>Carrito de compras</h4>
					<div className="row">
					<div className="col l6 m6 s12">
					{this.state.productos.map(item => (
					<div className="card horizontal" key={item.nombre}>
      						<div className="card-image">
							<img src={this.obtenerImagen(item.nombre)} alt="img" className="imagen-producto" />	

      						</div>
      						<div className="card-stacked">
        						<div className="card-content">
          							<h5>{item.nombre}</h5>
								<p>Unidades: {item.numero}</p>
								<p>Sub Total: $ {item.subtotal}</p>
       	 						</div>
     						 </div>
    					</div>
					))}
					</div>
					<div className="col l6 m6 s12">
						<h4>Total : {this.state.totalPagar}</h4>
						<Link className="btn" to="/home">Cancelar</Link>&nbsp;
						<button className="btn" onClick={this.pagar}>Pagar</button>
					</div>
					
					</div>
				</div>
			</div>
		)
	}

	obtenerImagen(nombre){
			
		var imagen = require('./img/'+nombre.toLowerCase()+".jpg");
		return imagen; 

	}

	pagar(){
	
		request.get("http://localhost:8080/eliminarProductosCarritoRc").end((err,res)=>{
			
			if(res.ok)
				this.setState({productos:[], totalPagar:0})
		})
	}

	obtenerProductosCarrito(){

		let total = 0;

		request.get('http://localhost:8080/obtenerProductosCarritoRc').end((err,res)=>{
			
			if(!res)
				return;
			
			res.body.productos.forEach((val)=>{
				this.setState({productos:this.state.productos.concat(val)})
		
			
				this.state.productos.forEach((val)=>{
					total = total + parseInt(val.subtotal);
				})
			})
			
			this.setState({totalPagar:total});

		})	
	}

}

export default Carrito;
