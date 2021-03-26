import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario.model';
import firebase from 'firebase';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  public tokenId: string;
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then(() => {
        delete usuario.senha;

        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario)
          .then(() => {

          }).catch((error) => {
            window.alert(error.message);
          });

      }).catch((error) => {
        window.alert(error.message);
      });
  }

  public login(email, password)
    : Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((resposta: any) => {
        localStorage.setItem('email', email);
        firebase.auth().currentUser.getIdToken().then((response: string) => {
          this.tokenId = response;
          localStorage.setItem('idToken', this.tokenId);
          this.router.navigate(['/home']);
        }).catch((error: Error) => window.alert(error.message)
        );
      });
    // .catch((error: Error) => window.alert(error.message));
  }

  public isAuthenticated(): boolean {
    if (this.tokenId === undefined && localStorage.getItem('idToken') != null) {
      this.tokenId = localStorage.getItem('idToken');
    }
    return this.tokenId !== undefined;
  }
  public logOut(): void {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('idToken');
      this.tokenId = undefined;
    });

  }
}
