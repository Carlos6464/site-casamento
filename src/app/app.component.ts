import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CasalComponent } from './casal/casal.component';
import { CerimoniaComponent } from './cerimonia/cerimonia.component';
import { PresenteComponent } from './presente/presente.component';
import { RecadoComponent } from './recado/recado.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, CasalComponent, CerimoniaComponent, PresenteComponent,RecadoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'site-casamento';
  isMobile: boolean = false;  // Controla se é dispositivo móvel
  menuOpen: boolean = false;  // Controla a abertura do menu hamburguer

    ngOnInit(): void {

    }

    // Detecta mudanças no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Verifica se é um dispositivo móvel (largura da tela menor que 600px)
  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 600;
  }

  // Alterna o menu hamburguer
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Fecha o menu após clicar em uma opção
  closeMenu(): void {
    this.menuOpen = false;
  }


  scrollTo(sectionId: string): void {
    const section = document.getElementById(sectionId);



    if (section) {
      const yOffset = -60; // Ajuste para deslocamento de 60px (altura do menu fixo)
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + yOffset;

      console.log("elementPosition");
      console.log(elementPosition);

      console.log("offsetPosition");
      console.log(offsetPosition);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      console.error(`Element with id "${sectionId}" not found.`);
    }
  }
}
