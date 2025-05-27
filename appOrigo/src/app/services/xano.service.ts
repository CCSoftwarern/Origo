import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Venda } from '../interfaces/venda';
import { TipoProduto } from '../interfaces/tipo-produto';
import { Operadora } from '../interfaces/operadora';
import { FormaPagamento } from '../interfaces/forma-pagamento';


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

//excluir um cliente

deleteCliente(id: number): Observable<any> {
  return this.http.delete(`${this.baseXano}/tb_clientes/${id}`).pipe(
    tap(() => {
      console.log(`Cliente com ID ${id} foi deletado com sucesso.`);
    })
  );
}

//Buscar vendas por data de embarque

  getVendaPorDataEmbarque(dtInicial:string, dtfinal:string): Observable<Venda[]> {
  return this.http.get(`${this.baseXano}`+'/tb_vendas_by_date?dt_inicial='+dtInicial+'&dt_final='+dtfinal).pipe(
    tap((res: any) => {
      console.log('Resposta das vendas:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}

//Buscar vendas por data de venda

//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_vendas_por_data_venda

getVendaPorDataVenda(dtInicial:string, dtfinal:string): Observable<Venda[]> {
  return this.http.get(`${this.baseXano}`+'/tb_vendas_por_data_venda?dtVendaInicial='+dtInicial+'&dtVendaFinal='+dtfinal).pipe(
    tap((res: any) => {
      console.log('Resposta das vendas:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}

//Get Produtos
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tp_produto

getProdutos():  Observable<TipoProduto[]>{
  return this.http.get(`${this.baseXano}`+'/tp_produto').pipe(
    tap((res: any) =>{
      console.log('Resposta das vendas:', res);
    })
  );

}

//Carregar operadoras():
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_operadora

getOperadoras():  Observable<Operadora[]>{
  return this.http.get(`${this.baseXano}`+'tb_operadora').pipe(
    tap((res: any) =>{
      console.log('Resposta das operadoras:', res);
    })
  );

}

//excluir uma venda
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_vendas/{tb_vendas_id}

deleteVenda(id: number): Observable<any> {
  return this.http.delete(`${this.baseXano}/tb_vendas/${id}`).pipe(
    tap(() => {
      console.log(`Cliente com ID ${id} foi deletado com sucesso.`);
    })
  );
}

//Pesquisa Clientes
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_clientes_cliente_pornome?texto=clau
getPesquisaCliente(termo:string): Observable<Cliente[]> {
  return this.http.get(`${this.baseXano}`+'/tb_clientes_cliente_pornome?texto='+termo).pipe(
    tap((res: any) => {
      console.log('Resposta da pesquisa cliente:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}

//Get forma de pagamento
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_formapgto
getFormaPgto():  Observable<FormaPagamento[]>{
  return this.http.get(`${this.baseXano}`+'tb_formapgto').pipe(
    tap((res: any) =>{
      console.log('Resposta de pagamento:', res);
    })
  );

}

}
