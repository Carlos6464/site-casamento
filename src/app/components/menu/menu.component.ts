import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

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
