import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-mapa',
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit {

  center: google.maps.LatLngLiteral = { lat: -22.435207938896063, lng: -44.04281817486195 }; 
  zoom = 18;
  // Configuração do mapa
  options: google.maps.MapOptions = {
    disableDefaultUI: true,   // Desativa os controles padrão do Google Maps
    zoomControl: false,       // Desativa o controle de zoom
    streetViewControl: false, // Desativa o controle de Street View
    mapTypeControl: false,    // Desativa o controle de tipo de mapa (normal, satélite)
    fullscreenControl: false, // Desativa o controle de tela cheia
    scrollwheel: false,       // Desativa o scroll para zoom
    draggable: true,          // Permite arrastar o mapa
    disableDoubleClickZoom: true // Desativa o zoom com clique duplo
  };
  markers = [
    { lat: -22.435408481980357, lng: -44.04267361839135 } , 
  ];
  constructor() {}
  
 
  
  ngOnInit(): void { }


}
