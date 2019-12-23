import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductosService } from './../productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
  providers: [ProductosService]
})
export class DetalleProductoComponent implements OnInit {

  producto = {
      nombre:'',
      imagen:'',
      precio:'',
      unidades:''
  }

  constructor(private route: ActivatedRoute,
  private location: Location, private productosService:ProductosService) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    let nombre = this.route.snapshot.paramMap.get('nombre');

    this.productosService.obtenerProductoPorNombre({'nombre':nombre}).subscribe((data) =>{


      this.producto.nombre = data[0].nombre;
      this.producto.imagen = data[0].imagen;
      this.producto.precio = data[0].precio;
      this.producto.unidades = data[0].unidades;

      console.log(this.producto);

    });
    /*this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);*/
  }

}
