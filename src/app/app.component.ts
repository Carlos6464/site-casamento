import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { HomeComponent } from './home/home.component';
import { CasalComponent } from './casal/casal.component';
import { CerimoniaComponent } from './cerimonia/cerimonia.component';
import { PresenteComponent } from './presente/presente.component';
import { RecadoComponent } from './recado/recado.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, HomeComponent, CasalComponent, CerimoniaComponent, PresenteComponent,RecadoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'site-casamento';
}
