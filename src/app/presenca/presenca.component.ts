import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';

interface Presenca {
  nome: string;
  email: string;
  telefone: String;
  qt_pessoas: number;
  status: boolean | null;
}
@Component({
  selector: 'app-presenca',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './presenca.component.html',
  styleUrl: './presenca.component.scss',
})
export class PresencaComponent {
  private httpService = inject(HttpService);

  presenca: Presenca = {
    nome: '',
    email: '',
    telefone: '',
    qt_pessoas: 0,
    status: null,
  };
  isloaed: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  async enviar() {
    this.isloaed = true;
    console.log(this.presenca);

    if (
      this.presenca.nome != '' &&
      this.presenca.email != '' &&
      this.presenca.telefone != '' &&
      this.presenca.qt_pessoas != null &&
      this.presenca.qt_pessoas > 0
    ) {
      this.presenca.telefone = this.presenca.telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      this.presenca.qt_pessoas = Number(this.presenca.qt_pessoas);

      this.httpService.post(`presenca`, this.presenca).subscribe(
        (response: any) => {
          this.isloaed = false;
          this.snackBar.open('Presença confirmada com suceso!', 'X', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.presenca = {
            nome: '',
            email: '',
            telefone: '',
            qt_pessoas: 0,
            status: null,
          };
        },
        (error) => {
          this.isloaed = false;
          this.snackBar.open(error.error.message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erro ao carregar dados', error.error);
        }
      );
    } else {
      this.isloaed = false;
      this.snackBar.open(
        'Por favor, insira todos os dados para confirmar esta ação.',
        'X',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
      );
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Verifica se o campo é o Telefone
    if (input.id === 'telefone') {
      let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

      // Limita a quantidade de caracteres a 11 (para telefone com DDD e número)
      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      // Aplica a máscara conforme a quantidade de caracteres
      if (value.length <= 2) {
        input.value = `(${value}`;
      } else if (value.length <= 6) {
        input.value = value.replace(/(\d{2})(\d{1,})/, '($1) $2');
      } else if (value.length <= 10) {
        input.value = value.replace(/(\d{2})(\d{4})(\d{1,})/, '($1) $2-$3');
      } else {
        input.value = value.replace(/(\d{2})(\d{5})(\d{1,})/, '($1) $2-$3');
      }
    }
  }
}
