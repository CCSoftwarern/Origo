import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { Cambio } from '../interfaces/cambio';

@Injectable({
  providedIn: 'root'
})
export class CambioService {
  private apiUrl = environment.apieconomia;

  constructor(private http: HttpClient) {}

  cambio(): Observable<Cambio[]> {
  return this.http.get(`${this.apiUrl}`).pipe(
    tap((res: any) => {
      console.log('Resposta do câmbio:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}



}
