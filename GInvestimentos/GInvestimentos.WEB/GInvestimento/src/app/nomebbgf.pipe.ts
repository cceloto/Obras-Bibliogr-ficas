import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomebbgf'
})
export class NomebbgfPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    var palavras = value.split(" ");
    var last = null;

    if (palavras.length == 1) {
      return value.toUpperCase();
    } else if (this.verificaReservada(palavras[palavras.length - 1]) && palavras.length > 2) {
      for (var i = palavras.length; i >= 0; i--) {
        if (i == palavras.length || i == (palavras.length - 1)) {
          last == null ? last = palavras[i - 1].toUpperCase() : last = palavras[i - 1].toUpperCase() + " " + last;
        } else break
      }
      palavras.splice(palavras.length - 2, 2);
      return last + ", " + this.capitalizarTexto(palavras).join(' ');
    } else {
      for (var i = palavras.length; i >= 0; i--) {
        if (i == palavras.length) {
          last = palavras[i - 1].toUpperCase();
          palavras.pop();
        }
        break
      }
      return last + ", " + this.capitalizarTexto(palavras).join(' ');
    }
  }

  verificaReservada(last: string) {
    var palavrasReservadas = ["FILHO", "FILHA", "NETO", "NETA", "SOBRINHO", "SOBRINHA", "JUNIOR"];
    for (var i = 0; i < palavrasReservadas.length; i++) {
      if (last.toUpperCase() === palavrasReservadas[i]) {
        return true;
      }
    };
    return false;
  };

  capitalizarTexto(texto: any) {
    var naoCapitalizado = ["da", "de", "do", "das", "dos"];
    texto.forEach(function (part, index, palavras) {
      if (!(naoCapitalizado.indexOf(palavras[index]) > -1)) {
        palavras[index] = palavras[index].charAt(0).toUpperCase() + palavras[index].slice(1);
      }
    });

    return texto;
  };
}
