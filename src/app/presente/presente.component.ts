import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../components/confirmar/confirmar.component';
import { HttpService } from '../http.service';
import { HttpClientModule } from '@angular/common/http';

interface Presente {
  id: number;
  nome: string;
  link: string;
  status: boolean;
  nome_user: string | null;
  email_user: string | null;
  preco: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-presente',
  imports: [
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './presente.component.html',
  styleUrl: './presente.component.scss',
})
export class PresenteComponent implements OnInit {
  private httpService = inject(HttpService);

  presentes: Presente[] = [];
  presentes_: Presente[] = [];
  paginatedItems: Presente[] = [];

  pageSize = 10;
  length = 0; // Inicializa como zero

  filtro: string = '';
  ordenar: string = 'a-z';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.httpService.get('presente').subscribe(
      (response: any) => {
        console.log(response);

        this.presentes = response || [];
        this.presentes_ = [...this.presentes];
        this.presentes = this.presentes.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );

        this.length = this.presentes.length; // Atualiza o total de itens
        this.updatePaginatedItems(0, this.pageSize);
      },
      (error) => {
        console.error('Erro ao carregar dados', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.updatePaginatedItems(pageIndex, pageSize);
  }

  updatePaginatedItems(pageIndex: number, pageSize: number): void {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.paginatedItems = this.presentes.slice(start, end);
  }

  showAlert(dados: Presente): void {
    this.dialog.open(ConfirmarComponent, {
      data: {
        title: 'Alerta',
        message: 'Este é um exemplo de alerta usando Angular Material.',
        presente: dados,
      },
      disableClose: true,
    });
  }

  filtroPresente() {
    this.presentes = [...this.presentes_]; // Restaura os dados originais
    if (this.filtro) {
      this.presentes = this.presentes.filter((presente: Presente) =>
        presente.nome.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
    this.length = this.presentes.length; // Atualiza o total de itens
    this.updatePaginatedItems(0, this.pageSize);
  }

  ordenarPresentes() {
    switch (this.ordenar) {
      case 'a-z':
        this.presentes = this.presentes.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        break;
      case 'menor-preco':
        this.presentes = this.presentes.sort((a, b) => a.preco - b.preco);
        break;
      case 'maior-preco':
        this.presentes = this.presentes.sort((a, b) => b.preco - a.preco);
        break;
      default:
        break;
    }
    this.length = this.presentes.length; // Atualiza o total de itens
    this.updatePaginatedItems(0, this.pageSize);
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
