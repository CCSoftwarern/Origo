import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/cliente';


@Injectable({
  providedIn: 'root'
})
export class XanoService {
private tokenKey = 'auth_token';
  private apiUrl = environment.apiUrl;
  private baseXano = environment.baseAPIXano;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res?.authToken) {
          localStorage.setItem(this.tokenKey, res.authToken);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  

  getClientes(): Observable<Cliente[]> {
  return this.http.get(`${this.baseXano}`+'/tb_clientes').pipe(
    tap((res: any) => {
      console.log('Resposta dos clientes:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}

}
