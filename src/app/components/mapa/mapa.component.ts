import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Carregar o Leaflet dinamicamente
      import('leaflet').then((L) => {
        setTimeout(() => {
          // Criar o mapa e definir a posição inicial
          this.map = L.map("map",{
            zoomControl: false, // Remove os controles de zoom
            scrollWheelZoom: false, // Desativa o zoom com o scroll do mouse
            doubleClickZoom: false, // Desativa o zoom com duplo clique
          }).setView([-22.435247606044122, -44.04274307301314], 12);

          // Usar a camada OpenStreetMap para o mapa
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this.map);

          // Criar um marcador em uma coordenada específica
          const marker = L.marker([-22.435247606044122, -44.04274307301314]).addTo(this.map);

          // Informações que você deseja mostrar no popup
          const popupContent = `
            <strong>Local:</strong> 6910 Estrada Fazenda União, California, Barra do Piraí - RJ, 27163-000<br>
            <strong>Latitude:</strong> -22.435247606044122<br>
            <strong>Longitude:</strong> -44.04274307301314<br>
            <strong>Telefone:</strong> (24) 99951-9515
          `;

          // Associar o popup com o marcador
          marker.bindPopup(popupContent);

          // Abre o popup automaticamente quando o marcador for adicionado ao mapa
          // marker.openPopup();

          // Adicionar mais interatividade: Exibir a posição do marcador ao clicar
          // marker.on('click', function() {
          //   alert(`Você clicou no marcador!\nLatitude: ${marker.getLatLng().lat}\nLongitude: ${marker.getLatLng().lng}`);
          // });

        }, 2000);
      }).catch(err => {
        console.error('Erro ao carregar o Leaflet', err);
      });
    }
  }
}
