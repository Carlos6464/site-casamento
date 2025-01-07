import { Routes } from '@angular/router';
import { CasalComponent } from './casal/casal.component';
import { CerimoniaComponent } from './cerimonia/cerimonia.component';
import { HomeComponent } from './home/home.component';
import { PresenteComponent } from './presente/presente.component';
import { RecadoComponent } from './recado/recado.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'casal', component: CasalComponent },
  { path: 'cerimonia', component: CerimoniaComponent },
  { path: 'presente', component: PresenteComponent },
  { path: 'recado', component: RecadoComponent },
];
