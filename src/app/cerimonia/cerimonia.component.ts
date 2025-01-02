import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MapaComponent } from '../components/mapa/mapa.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';




@Component({
  selector: 'app-cerimonia',
  imports: [CommonModule,MapaComponent ],
  templateUrl: './cerimonia.component.html',
  styleUrl: './cerimonia.component.scss'
})
export class CerimoniaComponent implements OnInit {
  
  ngOnInit(): void {
   
      
  }

}
