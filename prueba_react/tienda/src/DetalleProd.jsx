import React from 'react';
import Barra from './Barra.jsx';

class DetalleProd extends React.Component{
	

	render(){
		return(
			<div>
			<Barra />
			<div className="container">
				
				<h4>{this.props.prod.nombre}</h4>

				<div className="card horizontal">
      					<div className="card-image">
        					<img src={this.props.obtenerImagen(this.props.prod.imagen)}  alt="img" className="imagen-producto" />
      					</div>
      					<div className="card-stacked">
        					<div className="card-content">
          						<h5>Precio: $ {this.props.prod.precio}</h5>
							<p>Unidades: {this.props.prod.unidades}</p>
        					</div>
      					</div>
    				</div>

				<button className="btn" onClick={this.props.mtdVolver}>Volver</button>
			</div>
			
			</div>
		)
	}
}

export default DetalleProd;
