import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-100px, 0)' }),
        animate('800ms 0s ease-in-out')
      ])
    ]),
    trigger('animacao-painel', [
      state('criadoPainel', style({
        opacity: 1
      })),
      transition('void => criadoPainel', [
        style({ opacity: 0, transform: 'translate(100px, 0px)' }),
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),

          style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {
  estadoBanner = 'criado';
  estadoPainel = 'criadoPainel';
  cadastro = false;
  constructor() { }

  ngOnInit(): void {
  }
  exibirPainel(event): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public inicioAnimacao(): void {

  }
  public fimAnimacao(): void {

  }
}
