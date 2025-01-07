import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface User {
  nome_user: string;
  email_user: string;
  cpf_user: string;
}
@Component({
  selector: 'app-confirmar',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.scss',
})
export class ConfirmarComponent implements OnInit {
  private httpService = inject(HttpService);

  user: User = {
    nome_user: '',
    email_user: '',
    cpf_user: '',
  };

  isloaed: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarComponent>,
    private snackBar: MatSnackBar
  ) {}

  // Acessando os dados passados via dialog
  ngOnInit(): void {
    console.log(this.data.presente); // Aqui você acessa o objeto Presente passado
  }

  closeDialog(): void {
    this.dialogRef.close('Botão Fechar clicado');
  }

  async confirmar() {
    this.isloaed = true;
    if (
      this.user.nome_user &&
      this.user.nome_user != '' &&
      this.user.email_user &&
      this.user.email_user != '' &&
      this.user.cpf_user &&
      this.user.cpf_user != ''
    ) {
      this.user.cpf_user = this.user.cpf_user.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

      this.httpService
        .patch(`presente/${this.data.presente.id}`, this.user)
        .subscribe(
          (response: any) => {
            this.isloaed = false;
            this.snackBar.open('Presente selecionado com suceso!', 'X', {
              duration: 3000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
            });
            this.dialogRef.close('sucesso');
          },
          (error: any) => {
            this.isloaed = false;
            this.snackBar.open(error.error.message, 'X', {
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
        'Por favor, insira seu nome, e-mail e Cpf para confirmar a ação.',
        'X',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
      );
    }
  }

  capitalizarTexto(texto: string) {
    return texto
      .trim() // Remove espaços no início e no fim
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
      .toLowerCase() // Converte todo o texto para letras minúsculas
      .split(' ') // Divide o texto em palavras
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1)) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras de volta
  }

  // Método para aplicar a máscara no CPF e limitar o número de dígitos
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Verifica se o campo é o CPF
    if (input.id === 'cpf') {
      let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

      // Limita a quantidade de caracteres a 11 (CPF com 11 dígitos)
      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      // Aplica a máscara conforme a quantidade de caracteres
      if (value.length <= 3) {
        input.value = value;
      } else if (value.length <= 6) {
        input.value = value.replace(/(\d{3})(\d{1,})/, '$1.$2');
      } else if (value.length <= 9) {
        input.value = value.replace(/(\d{3})(\d{3})(\d{1,})/, '$1.$2.$3');
      } else {
        input.value = value.replace(
          /(\d{3})(\d{3})(\d{3})(\d{1,})/,
          '$1.$2.$3-$4'
        );
      }
    }
  }
}
