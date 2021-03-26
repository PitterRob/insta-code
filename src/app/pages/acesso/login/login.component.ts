import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() exibirCadastro: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    senha: new FormControl(null, [Validators.required]),
  });
  constructor(public autenticacao: AuthService) { }
  exibirError = false;
  ngOnInit(): void {
  }
  exibirPainelCadastro(): void {
    this.exibirCadastro.emit('cadastro');
  }

  LogIn(): void {
    this.autenticacao.login(this.formulario.value.email, this.formulario.value.senha)
      .then((resposta: any) => { })
      .catch((error: Error) => {
        if (error.message) {
          this.exibirError = true;
          this.formulario.controls.email.setErrors({ invalid: true });
          this.formulario.controls.senha.setErrors({ invalid: true });
        }
      });
  }
}
