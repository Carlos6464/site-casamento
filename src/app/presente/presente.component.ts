import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Importa PageEvent para capturar mudanças na página
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // Adicione isso
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../components/confirmar/confirmar.component';

interface Presente {
  key: number,
  nome: string,
  link: string,
  status: boolean,
  foto: string,
  preco: number,
}
@Component({
  selector: 'app-presente',
  imports: [CommonModule,  MatPaginatorModule, MatButtonModule,MatFormFieldModule,MatSelectModule,FormsModule, MatDialogModule],
  templateUrl: './presente.component.html',
  styleUrl: './presente.component.scss'
})
export class PresenteComponent {

  presentes: Presente[] = [
    { key: 1, nome: "Guarda Roupa", preco: 1200, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 2, nome: "Mesa de Jantar", preco: 800, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 3, nome: "Painel de TV", preco: 300, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 4, nome: "Sofá 3 lugares", preco: 2000, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 5, nome: "Cama Box Casal", preco: 900, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 6, nome: "Jogo de Panelas", preco: 500, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 7, nome: "Liquidificador", preco: 150, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 8, nome: "Air Fryer", preco: 400, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 9, nome: "Jogo de Cama Queen", preco: 300, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 10, nome: "Edredom Queen", preco: 250, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 11, nome: "Chaleira Elétrica", preco: 200, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 12, nome: "Microondas", preco: 600, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 13, nome: "Jogo de Toalhas", preco: 150, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 14, nome: "Aspirador de Pó", preco: 700, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 15, nome: "Smart TV 50\"", preco: 2500, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 16, nome: "Cafeteira", preco: 300, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 17, nome: "Ventilador de Mesa", preco: 150, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 18, nome: "Sanduicheira", preco: 120, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 19, nome: "Pratos e Copos", preco: 180, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 20, nome: "Tábua de Passar", preco: 100, link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" }
  ];

  presentes_: Presente[] = [];

  paginatedItems: Presente[] = []; // Array paginado


  pageSize = 10; // Tamanho da página
  length = this.presentes.length; // Total de itens

  filtro: string = '';
  ordenar: string = 'a-z';


  constructor(private dialog: MatDialog) {
    this.presentes = this.presentes.sort((a, b) => a.nome.localeCompare(b.nome));
    this.presentes_ = [...this.presentes];
    this.updatePaginatedItems(0, this.pageSize); // Carrega a primeira página de itens
  }


  onPageChange(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.updatePaginatedItems(pageIndex, pageSize);
  }

  updatePaginatedItems(pageIndex: number, pageSize: number): void {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.paginatedItems = this.presentes.slice(start, end); // Atualiza os itens mostrados na página
  }


  showAlert(dados: Presente): void {
    this.dialog.open(ConfirmarComponent, {
      data: {
        title: 'Alerta',
        message: 'Este é um exemplo de alerta usando Angular Material.',
        presente: dados  // Passando o objeto `dados` para o data
      },
    });
  }


  filtroPresente(){
    this.presentes = this.presentes_
    if(this.filtro &&  this.filtro != '')
        this.presentes = this.presentes.filter((presente: Presente) => presente.nome.toLowerCase().includes(this.filtro.toLowerCase()))
    this.updatePaginatedItems(0, this.pageSize); // Carrega a primeira página de itens

  }

  ordenarPresentes(){
    console.log(this.ordenar);
    switch (this.ordenar) {
      case 'a-z':
        this.presentes = this.presentes.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'menor-preco':
        this.presentes =  this.presentes.sort((a, b) => a.preco - b.preco);
        break
      case 'maior-preco':
        this.presentes =   this.presentes.sort((a, b) => b.preco - a.preco);
        break
      default:
        break;
    }

    this.updatePaginatedItems(0, this.pageSize); // Carrega a primeira página de itens

  }

}
