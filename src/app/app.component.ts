import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CasalComponent } from './casal/casal.component';
import { CerimoniaComponent } from './cerimonia/cerimonia.component';
import { PresenteComponent } from './presente/presente.component';
import { RecadoComponent } from './recado/recado.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpService } from './http.service';

interface Presente {
  id: number;
  nome: string;
  link: string;
  status: boolean;
  nome_user: string | null;
  email_user: string | null;
  preco: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
    CasalComponent,
    CerimoniaComponent,
    PresenteComponent,
    RecadoComponent,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'site-casamento';
  isMobile: boolean = false; // Controla se é dispositivo móvel
  menuOpen: boolean = false; // Controla a abertura do menu hamburguer
  isLoaded: boolean = false;
  isVisible = false;

  activeMenu: any = '';

  presentes: Presente[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    // Capturando o fragmento da URL
    this.route.fragment.subscribe((fragment) => {
      if (!this.activeMenu) this.activeMenu = 'home';
      else this.activeMenu = fragment;
      console.log('Fragmento:', this.activeMenu); // Exemplo: "recado"
    });
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
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + yOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      this.activeMenu = sectionId;
      console.log(elementPosition);
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

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    // Pegue os elementos pelas IDs
    const homeSection = document.getElementById('home');
    const casalSection = document.getElementById('casal');
    const cerimoniaSection = document.getElementById('cerimonia');
    const presenteSection = document.getElementById('presente');
    const recadoSection = document.getElementById('recado');

    // Verifique se as seções existem
    if (
      homeSection &&
      casalSection &&
      cerimoniaSection &&
      presenteSection &&
      recadoSection
    ) {
      // Pegue a posição de cada seção no viewport
      const sections = [
        { id: 'home', rect: homeSection.getBoundingClientRect() },
        { id: 'casal', rect: casalSection.getBoundingClientRect() },
        { id: 'cerimonia', rect: cerimoniaSection.getBoundingClientRect() },
        { id: 'presente', rect: presenteSection.getBoundingClientRect() },
        { id: 'recado', rect: recadoSection.getBoundingClientRect() },
      ];

      // Defina a lógica para identificar qual seção está mais próxima do topo
      const visibleSection = sections.find(
        (section) => section.rect.top <= 0 && section.rect.bottom >= 0
      );

      if (visibleSection) {
        this.activeMenu = visibleSection.id;
      }
    }

    // Detecte a direção da rolagem
    if (event.deltaY > 0) {
      console.log('Rolou para baixo');
    } else {
      console.log('Rolou para cima');
    }
  }

 
}

// this.presentes_ = [...this.presentes];
// this.presentes = this.presentes.sort((a, b) =>
//   a.nome.localeCompare(b.nome)
// );

// console.log('presentes');

// this.length = this.presentes.length; // Atualiza o total de itens

// console.log(this.presentes);
// this.updatePaginatedItems(0, this.pageSize);
