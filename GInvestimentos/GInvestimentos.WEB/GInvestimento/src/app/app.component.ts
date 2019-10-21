import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  autores = [];
  listaAutores: any = [];
  enviando = false;
  listagem = false;

  constructor(public rest: RestService) { }

  getAutores() {
    this.listaAutores = [];
    this.rest.getAutores().subscribe((data: {}) => {
      this.listaAutores = data;
    });
  };
  addAutores(autores: any) {
    this.rest.addAutores(autores).subscribe((result) => {
      console.log(result);
      this.toogleLista();
      this.autores = [];
    }, (err) => {
      console.log(err + "caique");
    });
  };

  toogleLista() {
    if (this.listagem === false) {
      this.getAutores();
      this.listagem = true;
    }else{
      this.listagem = false;
    };
  };

  criaAutores(quantidade: number) {
    if (this.autores.length > 0) {
      if (quantidade > this.autores.length) {
        var lastId = this.autores[this.autores.length - 1].id;
        var dif = quantidade - this.autores.length;
        for (var i = 0; i < dif; i++) {
          this.autores.push({
            id: lastId += 1,
            nome: ''
          });
        };
      } else if (this.autores.length > quantidade) {
        var dif = this.autores.length - quantidade;
        for (var i = 0; i < dif; i++) {
          this.autores.pop()
        };
      }
    } else {
      this.autores = []
      for (var i = 0; i < quantidade; i++) {
        this.autores.push({
          id: i + 1,
          nome: ''
        });
      };
    }
  };

  enviarAutores() {
    this.enviando = true;
    this.addAutores(this.autores);
    this.enviando = false;
  };

  formValidator() {
    return this.autores.reduce(function (vazio, currentValue) {
      return vazio || (currentValue.nome === "" || currentValue.nome == null)
    }, false);

  };

}