import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  obtenerTodosProductos(){
    return this.http.get('http://localhost:8080/obtenerProductos');

  }

  obtenerProductoMatch(valor:any){

    let data = JSON.stringify(valor);
    return this.http.post('http://localhost:8080/buscarProductoMatch',data);

  }

  obtenerProductoPorNombre(valor:any){

    let data = JSON.stringify(valor);

    return this.http.post('http://localhost:8080/obtenerProducto',data);

  }

  agregarProductoCarrito(valor:any){

    let data = JSON.stringify(valor);

    return this.http.post('http://localhost:8080/agregarCarrito',data);

  }


  obtenerNumProdCarrito(){

    return this.http.get('http://localhost:8080/obtenerNumProdCarrito');

  }

  obtenerProductosCarrito(){
    return this.http.get('http://localhost:8080/obtenerProductosCarrito');
  }

  eliminarProductosCarrito(){
    return this.http.get('http://localhost:8080/eliminarProductosCarrito');
  }

}
