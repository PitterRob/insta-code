import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  publicacoes = [];
  constructor(public bd: BdService) { }

  ngOnInit(): void {
    this.atualizarTimeline();
  }

  public atualizarTimeline(): void {
    this.bd.getPublicacoes(localStorage.getItem('email')).then((publicacoes: any) => {
      this.publicacoes = publicacoes;
    });
  }

}
