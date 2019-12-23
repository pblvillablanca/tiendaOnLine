import { Component, OnInit, Injectable } from '@angular/core';
import { ProductosService } from './../productos.service';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers:[ProductosService]

})
export class CarritoComponent implements OnInit {

  numero:number = 0;
  total:number=0;

  productosCarrito = {
      productos : []
  };

  constructor(private productosService:ProductosService, private router:Router) { }

  ngOnInit() {
    this.obtenerNumProdCarrito();
    this.obtenerProductosCarrito();
    this.obtenerTotal();
  }

  obtenerNumProdCarrito(){
    this.productosService.obtenerNumProdCarrito().subscribe((data) => {
      this.numero = data['count'];
    });

  }

  obtenerProductosCarrito(){
    this.productosService.obtenerProductosCarrito().subscribe((data) => {

            for(let prod of data["productos"]){
                for(let prod2 of prod){
                 this.productosCarrito.productos.push(prod2);
               }
            }
    })

  }


  obtenerTotal(){

    let superTotal=0;

    for(let prod of this.productosCarrito.productos){

      superTotal = Number(superTotal) + Number(prod.subtotal);
    }

    return superTotal;

  }

  eliminarProductosCarrito(){
    this.productosService.eliminarProductosCarrito().subscribe((data) => {
        this.numero = 0;
        this.router.navigateByUrl('home');
    })

  }

}
