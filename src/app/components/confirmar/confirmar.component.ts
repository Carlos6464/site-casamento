import { Component,Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmar',
  imports: [MatDialogModule,MatButtonModule,CommonModule,MatIconModule],
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.scss'
})
export class ConfirmarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmarComponent>
) {}

  // Acessando os dados passados via dialog
  ngOnInit(): void {
    console.log(this.data.presente);  // Aqui você acessa o objeto Presente passado
  }

  get title() {
    return this.data.title;
  }

  get message() {
    return this.data.message;
  }

  closeDialog(): void {
    this.dialogRef.close('Botão Fechar clicado');
  }
}
