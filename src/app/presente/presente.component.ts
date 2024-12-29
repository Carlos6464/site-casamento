import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Importa PageEvent para capturar mudanças na página
interface Presente {
  key: number,
  nome: string,
  link: string,
  status: boolean,
  foto: string
}
@Component({
  selector: 'app-presente',
  imports: [CommonModule,  MatPaginatorModule, MatButtonModule],
  templateUrl: './presente.component.html',
  styleUrl: './presente.component.scss'
})
export class PresenteComponent {

  presentes: Presente[] = [
    { key: 1, nome: "Guarda Roupa", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 2, nome: "Mesa de Jantar", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 3, nome: "Painel de TV", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 4, nome: "Sofá 3 lugares", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 5, nome: "Cama Box Casal", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 6, nome: "Jogo de Panelas", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 7, nome: "Liquidificador", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 8, nome: "Air Fryer", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 9, nome: "Jogo de Cama Queen", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 10, nome: "Edredom Queen", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 11, nome: "Chaleira Elétrica", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 12, nome: "Microondas", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 13, nome: "Jogo de Toalhas", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 14, nome: "Aspirador de Pó", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 15, nome: "Smart TV 50\"", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 16, nome: "Cafeteira", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 17, nome: "Ventilador de Mesa", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 18, nome: "Sanduicheira", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 19, nome: "Pratos e Copos", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" },
    { key: 20, nome: "Tábua de Passar", link: "https://via.placeholder.com/200x150", status: false, foto: "https://via.placeholder.com/200x150" }
  ];

  paginatedItems: Presente[] = []; // Array paginado

 
  pageSize = 10; // Tamanho da página
  length = this.presentes.length; // Total de itens


  constructor() {
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

}
