import { Component, Inject, inject, OnInit } from '@angular/core';
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
      this.user.email_user != ''
    ) {
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
          (error) => {
            this.isloaed = false;
            this.snackBar.open('Error ao selecionar presente!', 'X', {
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
        'Por favor, insira seu nome e e-mail para confirmar a ação.',
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
}
