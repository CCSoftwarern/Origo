import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule, Ripple } from 'primeng/ripple';
import { CambioService } from '../../services/cambio.service';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, RippleModule, Ripple, DatePipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {
  cambios: any;
  errorMessage: string = '';

  constructor(private servicecambio: CambioService){}
  ngOnInit(): void {
    this.getCambio();
  }

getCambio() {
  this.servicecambio.cambio().subscribe({
    next: (res) => {
      console.log('Taxa de câmbio recebida:', res);
      // Aqui você pode salvar em uma variável, exibir no HTML, etc.
      this.cambios = res;
    },
    error: (err) => {
      console.error('Erro ao buscar taxa de câmbio:', err);
      this.errorMessage = 'Erro ao consultar a taxa de câmbio.';
    }
  });
}



}
