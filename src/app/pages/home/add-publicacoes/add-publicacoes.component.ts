import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BdService } from 'src/app/services/bd.service';
import firebase from 'firebase';
import { ProgressoService } from 'src/app/services/progresso.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-add-publicacoes',
  templateUrl: './add-publicacoes.component.html',
  styleUrls: ['./add-publicacoes.component.css']
})
export class AddPublicacoesComponent implements OnInit {

  @Output() atulizarTimeline: EventEmitter<any> = new EventEmitter<any>();

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });
  email: string;
  imagem: any;
  public progressoStatus = 'pendente';
  public porcentagem = 0;

  constructor(
    public bdService: BdService,
    private progresso: ProgressoService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }
  publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    });
    const secondsCounter = interval(500);
    const subscription = secondsCounter.subscribe(() => {
      this.progressoStatus = 'andamento';
      this.porcentagem += 25;
      if (this.progresso.status === 'concluido') {
        this.progressoStatus = 'concluido';
        this.atulizarTimeline.emit();
        subscription.unsubscribe();
      }
    }
    );
  }
  public selectFile(event: Event): void {
    const imagem = event.currentTarget as HTMLInputElement;

    this.imagem = imagem.files[0];

  }
}
