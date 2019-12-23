import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './../usuario.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {

  usuarioExiste:boolean;
	formEnviado:boolean = false;

	formLogin:FormGroup;

	constructor(private usuarioService:UsuarioService, private router:Router){

	}

  ngOnInit() {

    this.formLogin = new FormGroup({
      'usuario': new FormControl('',Validators.required),
      'pass': new FormControl('',Validators.required)
    })
  }

  login(){
    this.formEnviado = true;
    this.usuarioExiste  = true;
    let usuario = this.formLogin.value.usuario;
    let pass = this.formLogin.value.pass;
    console.log("Enviando usuario = " + usuario + " PAss " + pass);

    this.usuarioService.existeUsuario({'usuario':usuario, 'pass':pass}).subscribe((data) => {
      console.log(data['status']);
      if(data['status'] == 200){
        this.usuarioExiste = true;
        this.router.navigateByUrl('home');
      }

      if(data['status'] == 404)
        this.usuarioExiste = false;

    });
  }

}
