import { Component, OnInit } from '@angular/core';
import { MapaComponent } from '../components/mapa/mapa.component';




@Component({
  selector: 'app-cerimonia',
  imports: [ MapaComponent],
  templateUrl: './cerimonia.component.html',
  styleUrl: './cerimonia.component.scss'
})
export class CerimoniaComponent implements OnInit {
 

  ngOnInit(): void {
    
  }

}
