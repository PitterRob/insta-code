import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Usuario } from '../models/usuario.model';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() exibirLogin: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    nomeUsuario: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    nomeCompleto: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    senha: new FormControl(null, [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
    confirmarSenha: new FormControl(null, [Validators.required]),
  }, this.passwordMatchValidator);

  olhoSenha = '/assets/olho_1.png';
  olhoConfirmarSenha = '/assets/olho_1.png';
  senhaIgual = true;
  usuario: Usuario = {
    email: '',
    nomeCompleto: '',
    nomeUsuario: '',
    senha: '',
  };
  constructor(public autenticacao: AuthService) { }

  ngOnInit(): void {
  }

  passwordMatchValidator(frm: FormGroup): any {
    if (frm.controls.senha.value === frm.controls.confirmarSenha.value) {
      frm.controls.confirmarSenha.setErrors(null);
    } else {
      frm.controls.confirmarSenha.setErrors({ mismatch: false });
    }
    return null;
  }


  exibirPainelLogin(): any {
    this.exibirLogin.emit('login');
  }
  cadastrarUsuario(): any {
    this.usuario.email = this.formulario.value.email;
    this.usuario.nomeCompleto = this.formulario.value.nomeCompleto;
    this.usuario.nomeUsuario = this.formulario.value.nomeUsuario;
    this.usuario.senha = this.formulario.value.senha;
    this.autenticacao.cadastrarUsuario(this.usuario).then(() => this.exibirPainelLogin());
  }

  mouseDown(tipo): any {


    if (tipo === 'senha') {
      this.olhoSenha = '/assets/olho_2.png';
      (document.getElementById('mostrarSenha') as HTMLInputElement).type = 'text';
    } else {
      this.olhoConfirmarSenha = '/assets/olho_2.png';
      (document.getElementById('mostrarConfirmarSenha') as HTMLInputElement).type = 'text';
    }

  }
  mouseUp(tipo): void {

    if (tipo === 'senha') {
      this.olhoSenha = '/assets/olho_1.png';
      (document.getElementById('mostrarSenha') as HTMLInputElement).type = 'password';
    } else {
      this.olhoConfirmarSenha = '/assets/olho_1.png';
      (document.getElementById('mostrarConfirmarSenha') as HTMLInputElement).type = 'password';
    }

  }
}
