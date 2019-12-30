import React from 'react';
import {Link} from "react-router-dom";
import * as request from 'superagent';

class Barra extends React.Component{

	constructor(props){
		super(props)

		this.state ={
			numProd:0
		}


		this.calcNumProd = this.calcNumProd.bind(this);
		this.calcNumProd();
	}
	

	componentWillReceiveProps(props){
		this.setState({numProd:props.numProdBarra})
	}

	render(){
		
		
		return(
			<div>
				<nav>
   					 <div className="nav-wrapper">
      						<a href="/home" className="brand-logo">Tienda On-Line</a>
      						<ul id="nav-mobile" className="right hide-on-med-and-down">
       							<li><Link to="/home">Inicio</Link></li>
        						<li><Link to="/carrito">Carrito <b>({this.state.numProd})</b></Link></li>
        						<li><Link to="">Cerrar sesión</Link></li>
      						</ul>
    					</div>
  				</nav>
			</div>
		)
	}
	

	calcNumProd(){
		
		request.get("http://localhost:8080/obtenerNumProdCarritoRc").end((err,res)=>{
			
			if(res.ok){
				this.setState({numProd:res.body.count})
			}
		})
	
	}
}

export default Barra;
