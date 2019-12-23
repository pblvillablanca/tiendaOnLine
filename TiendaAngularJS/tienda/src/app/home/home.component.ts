import { Component, OnInit } from '@angular/core';
import { ProductosService } from './../productos.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CarritoComponent } from './../carrito/carrito.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ProductosService]
})
export class HomeComponent implements OnInit {

  productosJson = {
      productos:[]
  };

  constructor(private productosService:ProductosService, private carritoComponent:CarritoComponent) {}

  ngOnInit() {
        this.productosService.obtenerNumProdCarrito().subscribe((data) => {
          this.carritoComponent.numero = data['count'];
        });
  }


  ngAfterViewInit(){
    this.obtenerTodosProductos();
  }

  obtenerTodosProductos(){

    this.productosService.obtenerTodosProductos().subscribe((data)=>{

        for(let idx in data){
          this.productosJson.productos.push(data[idx]);
        }

    })

  }


  buscarProd(valor:string){

    this.productosJson.productos = [];

    this.productosService.obtenerProductoMatch({'nombre':valor}).subscribe((data)=>{

        for(let idx in data){
          this.productosJson.productos.push(data[idx]);
        }

    })
  }

  agregarCarrito(numProductos:number, nombreProd:string, precio:string){
    let subtotal = Number(numProductos) * Number(precio);
    this.productosService.agregarProductoCarrito({'numero':numProductos,'nombre':nombreProd,'precio':precio,'subtotal':subtotal}).subscribe(data => {

        if(data['status'] == 200)
          this.carritoComponent.numero = Number(this.carritoComponent.numero) +  Number(numProductos);

    });

  }


}
