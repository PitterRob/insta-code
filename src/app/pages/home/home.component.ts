import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../acesso/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('publicacoes') public publicacoes: any;

  constructor(public autenticacao: AuthService) { }

  ngOnInit(): void {
  }
  sair(): void {
    this.autenticacao.logOut();
  }
  atulizarTimeline(): void {
    this.publicacoes.atualizarTimeline();
  }
}
