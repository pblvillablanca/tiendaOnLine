import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './barra/barra.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const urls:Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'detalleProducto/:nombre',component:DetalleProductoComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    CarritoComponent,
    DetalleProductoComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(urls),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
