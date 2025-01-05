import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../http.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

interface Recado {
  nome: string;
  email: string;
  recado: string;
}

@Component({
  selector: 'app-recado',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './recado.component.html',
  styleUrl: './recado.component.scss',
})
export class RecadoComponent {
  private httpService = inject(HttpService);
  isloaed: boolean = false;

  recado: Recado = {
    nome: '',
    email: '',
    recado: '',
  };

  constructor(private snackBar: MatSnackBar) {}

  async enviar() {
    this.isloaed = true;
    if (
      this.recado.nome &&
      this.recado.nome != '' &&
      this.recado.email &&
      this.recado.email != '' &&
      this.recado.recado &&
      this.recado.recado != ''
    ) {
      this.httpService.post(`recado`, this.recado).subscribe(
        (response: any) => {
          this.isloaed = false;
          this.snackBar.open('Recado enviado com suceso!', 'X', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.recado = {
            nome: '',
            email: '',
            recado: '',
          };
        },
        (error) => {
          this.isloaed = false;
          this.snackBar.open('Error ao enviar!', 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          console.error('Erro ao carregar dados', error);
        }
      );
    } else {
      this.isloaed = false;
      this.snackBar.open(
        'Por favor, insira seu nome, e-mail e recado para confirmar a ação.',
        'X',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
      );
    }
  }
}
