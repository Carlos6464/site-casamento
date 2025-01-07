import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
export class PresenteComponent implements OnInit, AfterViewInit {
  private httpService = inject(HttpService);

  presentes: Presente[] = [];
  presentes_: Presente[] = [];
  paginatedItems: Presente[] = [];

  presentesComprados: Presente[] = [];
  pageSize = 10;
  length = 0; // Inicializa como zero

  filtro: string = '';
  filtroComprado: string = '';
  ordenar: string = 'a-z';
  isloaed: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.presentes = [];
    this.carregarDados();
  }

  carregarDados() {
    this.httpService.get('presente').subscribe(
      (response: any) => {
        this.presentes = response || [];
        this.presentes_ = [...this.presentes];
        this.presentes = this.presentes.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );

        console.log('presentes');

        this.length = this.presentes.length; // Atualiza o total de itens

        console.log(this.presentes);
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
    let dialogRef = this.dialog.open(ConfirmarComponent, {
      data: {
        presente: dados,
      },
      disableClose: true,
    });

    // Detectando quando o modal foi fechado
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal fechado!', result); // `result` contém os dados enviados ao fechar o modal
      if (result && result == 'sucesso') {
        this.carregarDados();
        this.redirectToLink(dados.link);
      }
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

  filtroPresenteComprado() {
    this.isloaed = true;
    this.httpService
      .get(`presente/confirm?search=${this.filtroComprado}`)
      .subscribe(
        (response: any) => {
          this.isloaed = false;
          this.presentesComprados = response || [];
        },
        (error) => {
          this.isloaed = false;
        }
      );
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

  capitalizarTexto(texto: string) {
    return texto
      .trim() // Remove espaços no início e no fim
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
      .toLowerCase() // Converte todo o texto para letras minúsculas
      .split(' ') // Divide o texto em palavras
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1)) // Capitaliza a primeira letra de cada palavra
      .join(' '); // Junta as palavras de volta
  }

  truncateText(text: string, maxLength: number): string {
    let textAjustado = this.capitalizarTexto(text);

    if (textAjustado.length > maxLength) {
      return textAjustado.substring(0, maxLength) + '...';
    }

    return textAjustado;
  }

  formatarParaReais(valor: any) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  redirectToLink(link: any): void {
    const url = link;
    window.open(url, '_blank'); // Abre o link em uma nova aba
  }
}
