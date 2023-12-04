import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UsuarioService } from './../../services/post.service'

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  token: any;
  datos:any;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")

    this.usuarioService.getUsuario(this.token.alias).subscribe(
      (data:any) => {        
        this.datos = data;
      }
    );
  }

  perfil() {
    window.location.href = "/muro/" + this.getDecodedAccessToken(this.token).alias
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}