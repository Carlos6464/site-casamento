import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  targetDate: Date = new Date('2025-05-24T15:30:00'); // Data e hora alvo: 24/05/2025 às 15:30
  timeLeft: { days: number; hours: number; minutes: number; seconds: number } =
    {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.onload = () => {
        this.startCountdown();
      };
    }
  }

  private startCountdown(): void {
    this.updateTimeLeft(); // Atualiza imediatamente
    this.intervalId = setInterval(() => {
      this.updateTimeLeft(); // Atualiza a contagem regressiva a cada segundo
    }, 1000);
  }

  private updateTimeLeft(): void {
    const now = new Date().getTime();
    const target = this.targetDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      // Calcula os valores
      this.timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      // Quando o tempo termina
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId); // Para o intervalo
    }
  }
}
