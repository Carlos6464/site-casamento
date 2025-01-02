import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
      import('leaflet').then((L: any) => {
        console.log('Leaflet carregado:', L);

        // Garantir que L seja do tipo correto
        const leaflet = L.default || L; // Caso seja importado como módulo, o objeto Leaflet pode estar em 'default'

        // Verificar se o método map está disponível
        if (leaflet && typeof leaflet.map === 'function') {
          // Criar o mapa e definir a posição inicial
          this.map = leaflet.map("map", {
            zoomControl: false, // Remove os controles de zoom
            scrollWheelZoom: false, // Desativa o zoom com o scroll do mouse
            doubleClickZoom: false, // Desativa o zoom com duplo clique
          }).setView([-22.435247606044122, -44.04274307301314], 12);

          // Usar a camada OpenStreetMap para o mapa
          leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this.map);

            // Definir um ícone personalizado para o marcador
          const customIcon = leaflet.icon({
            iconUrl: './assets/ping.png', // Caminho da imagem do marcador
            iconSize: [32, 32], // Tamanho do ícone
            iconAnchor: [16, 32], // Posição do âncora do ícone
            popupAnchor: [0, -32], // Posição do popup
          });

          // Criar um marcador em uma coordenada específica
          const marker = leaflet.marker([-22.435247606044122, -44.04274307301314], { icon: customIcon }).addTo(this.map);

          // Informações que você deseja mostrar no popup
          const popupContent = `
            <strong>Local:</strong> 6910 Estrada Fazenda União, California, Barra do Piraí - RJ, 27163-000<br>
            <strong>Latitude:</strong> -22.435247606044122<br>
            <strong>Longitude:</strong> -44.04274307301314<br>
            <strong>Telefone:</strong> (24) 99951-9515
          `;

          // Associar o popup com o marcador
          marker.bindPopup(popupContent);
        } else {
          console.error('Leaflet não foi carregado corretamente ou o método map não está disponível');
        }
      }).catch(err => {
        console.error('Erro ao carregar o Leaflet', err);
      });
    }
  }
}
