import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule, // Necessário para animações do toastr
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right', // Posição global
        timeOut: 3000, // Tempo de exibição do toast
        progressBar: true, // Barra de progresso
        closeButton: true, // Botão de fechar
      }) // Configuração global do Toastr
    ),
  ],
};
