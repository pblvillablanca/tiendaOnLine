import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

	constructor(private http:HttpClient) { }

	existeUsuario(userAndPass:any){

		let data = JSON.stringify(userAndPass);

		return this.http.post('http://localhost:8080/existeUsuario/pablo',data);

	}


}
