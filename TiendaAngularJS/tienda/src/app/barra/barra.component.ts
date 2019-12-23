import { Component, OnInit, Input} from '@angular/core';
import { CarritoComponent } from './../carrito/carrito.component';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {


  constructor(private carritoComponent:CarritoComponent) { }

  ngOnInit() {
    
  }

  numeroProductoscarrito(){
    return this.carritoComponent.numero;
  }

}
