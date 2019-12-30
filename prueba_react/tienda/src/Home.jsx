import React from 'react';
import Barra from './Barra.jsx';
import * as request from 'superagent';
import './Home.css';
import DetalleProd from './DetalleProd.jsx';

class Home extends React.Component{
	
	constructor(){
		super()

		this.state = {
			
				productos : [],
				prouctoVer:{},
				numProdCarrito:0,
				prodCarrito:'',
				precioProdCarrito:'',
				numProdBarra:0
		}

		this.obtenerProductos();

		this.obtenerProductoMatch = this.obtenerProductoMatch.bind(this);
		this.verProducto = this.verProducto.bind(this);
		this.volverHome = this.volverHome.bind(this);
		this.sumarProductos = this.sumarProductos.bind(this);
		this.addCarrito = this.addCarrito.bind(this);
		this.calcularNumProd = this.calcularNumProd.bind(this);
		this.calcularNumProd();
	}

	render(){

		if(this.state.productoVer){
			return <DetalleProd prod={this.state.productoVer} mtdVolver={this.volverHome} obtenerImagen={this.obtenerImagen} />
			//return(<div><h3>Ver Producto</h3><button className="btn" onClick={this.volverHome}>Volver</button></div>);
		}else{

		 return(
			<div>
			<Barra numProdBarra={this.state.numProdBarra} calcularNumProd={this.calcularNumProd}/>
			<div className="container">
			
				<h4>Catálogo de productos</h4>
				
				<input type="text" placeholder="Buscar producto" onChange={this.obtenerProductoMatch} />	
				
				 <div className="row">
        				{this.state.productos.map(item => (
       						<div className="col l3 m12 s12" key={item.nombre}> 
						<div  key={item.nombre} className="card">
      							<div className="card-image">
							<img src={this.obtenerImagen(item.imagen)} alt="img" className="imagen-producto" />	
							</div>
        						<div className="card-content">
          								<h5>{item.nombre}</h5>
									<p>Precio: {item.precio}</p>
									<p>Unidades Disponibles: {item.unidades}</p>
        						</div>
        						<div className="card-action">
          								<button className="btn" onClick={this.verProducto} data-nombre={item.nombre}>Ver más</button>
									<input type="text" onChange={this.sumarProductos} data-prod={item.nombre} data-precio={item.precio} placeholder="Ingrese número de productos" />
									<button className="btn" onClick={this.addCarrito}>Añadir</button>
        						</div>
    						</div> 
						</div>
					))}
      				 </div>

			</div>
			</div>
		 )
		}
	}

	calcularNumProd(){

		 request.get("http://localhost:8080/obtenerNumProdCarritoRc").end((err,res)=>{

                        if(res.ok)
                                this.setState({numProdBarra:res.body.count})
                })

	}

	addCarrito(){
		
		let subTotal = this.state.numProdCarrito * this.state.precioProdCarrito;
		
		request.post("http://localhost:8080/agregarCarritoRc").send({"numero":this.state.numProdCarrito,"nombre":this.state.prodCarrito,"precio":this.state.precioProdCarrito,"subtotal":subTotal}).end((err,res)=>{
			//this.setState({numProdBarra:this.state.numProdBarra + parseInt(this.state.numProdCarrito)})
			this.calcularNumProd();
		})
	}

	sumarProductos(e){
		this.setState({
			numProdCarrito: e.target.value, prodCarrito:e.target.getAttribute("data-prod"),precioProdCarrito:e.target.getAttribute("data-precio")})
		
	}


	volverHome(){
		this.setState({productoVer:null});
	}

	obtenerProductos(){
	 	
		request.get('http://localhost:8080/obtenerProductosRc').end((err,res)=>{
		
			if(err || !res.ok)
				console.log('Error');

			res.body.forEach((val)=>{
				this.setState({ productos : this.state.productos.concat(val)})
			})

		})
	} 

	obtenerImagen(nombre){
			
		var imagen = require('./img/'+nombre);
		return imagen; 

	}


	obtenerProductoMatch(e){
		let data = {"nombre":e.target.value}
		   
		this.setState({ productos : [] })

		request.post('http://localhost:8080/buscarProductoMatchRc').send(data).end((err,res)=>{
		
			if(err || !res.ok)
				console.log(err);

			 res.body.forEach((val)=>{
                                this.setState({ productos : this.state.productos.concat(val)})
                        })
		})
	
	}

	verProducto(e){

		request.post('http://localhost:8080/obtenerProductoRc').send({"nombre":e.target.getAttribute("data-nombre")}).end((err,res)=>{
			
			this.setState({productoVer : res.body[0]});	

		})
		
		

		
	}

}

export default Home;
