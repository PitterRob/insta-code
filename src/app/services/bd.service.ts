import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ProgressoService } from './progresso.service';
@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progresso: ProgressoService) { }

  public publicar(recebido: any): void {
    firebase.database().ref(`publicacoes/${btoa(recebido.email)}`)
      .push({ titulo: recebido.titulo })
      .then((resposta: any) => {
        const nomeImagem = resposta.key;
        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(recebido.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
            },
            (error) => {
              this.progresso.status = 'erro';
            },
            () => {
              this.progresso.status = 'concluido';
            });
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  public getPublicacoes(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`publicacoes/${btoa(email)}`)
        .once('value')
        .then((snapshot: any) => {

          // tslint:disable-next-line: prefer-const
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            // tslint:disable-next-line: prefer-const
            let publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;
            publicacoes.push(publicacao);
          });
          return publicacoes.reverse();
        })
        .then((publicacoesReverse: any) => {
          publicacoesReverse.forEach(publicacao => {
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url = url;
                firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                  .orderByKey()
                  .once('value')
                  .then((snapshotUser: any) => {
                    publicacao.nome = snapshotUser.val().nomeUsuario;
                  });
              });
          });
          resolve(publicacoesReverse);
        });
    });

  }
}
