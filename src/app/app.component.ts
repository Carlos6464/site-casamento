import { AfterViewInit, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CasalComponent } from './casal/casal.component';
import { CerimoniaComponent } from './cerimonia/cerimonia.component';
import { PresenteComponent } from './presente/presente.component';
import { RecadoComponent } from './recado/recado.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, CasalComponent, CerimoniaComponent, PresenteComponent,RecadoComponent, CommonModule,MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'site-casamento';
  isMobile: boolean = false;  // Controla se é dispositivo móvel
  menuOpen: boolean = false;  // Controla a abertura do menu hamburguer
  isLoaded: boolean = false;
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  // Detecta mudanças no tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfLoaded(); // Verifica o carregamento
      this.isLoaded = true
    }
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      console.error(`Element with id "${sectionId}" not found.`);
    }
  }



  // Verifica o scroll da página
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isVisible = scrollPosition > 100; // Aparece após rolar 100px
  }
   // Desliza suavemente para o topo
   scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  checkIfLoaded(): void {
    // Aguarda até que todos os elementos estejam carregados
    const homeSection = document.getElementById('home');
    const casalSection = document.getElementById('casal');
    const cerimoniaSection = document.getElementById('cerimonia');
    const presenteSection = document.getElementById('presente');
    const recadoSection = document.getElementById('recado');

    // Se todos os elementos estiverem carregados, muda a variável `isLoaded` para true
    if (homeSection && casalSection && cerimoniaSection && presenteSection && recadoSection) {
      console.log('esta tudo certo');
    } else {
      // Se algum elemento não estiver carregado, pode definir um timeout para re-tentar
      setTimeout(() => this.checkIfLoaded(), 500);
    }
  }
}
