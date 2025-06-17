import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { ConsultaVenda } from '../interfaces/consulta-venda';
import { TipoProduto } from '../interfaces/tipo-produto';
import { Operadora } from '../interfaces/operadora';
import { FormaPagamento } from '../interfaces/forma-pagamento';
import { firstValueFrom } from 'rxjs';
import { Venda } from '../interfaces/venda';


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

  



//////////////// Operações com Clientes /////////////////////////////////

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

//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_clientes

//Cadastrar cliente

async postCliente(cliente: Cliente): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Caso use autenticação:
      // 'Authorization': `Bearer ${this.}`,
    });
    try {
      const response = await firstValueFrom(
        this.http.post(this.baseXano+'tb_clientes', cliente, { headers })
      );
      console.log('Cliente adicionado:', response);
    } catch (error: any) {
      console.error('Erro ao adicionar cliente:', error);
      throw error;
    }
  }


////////////// Operações com vendas //////////////////////////////////////

//Buscar vendas por data de embarque

  getVendaPorDataEmbarque(dtInicial:string, dtfinal:string): Observable<ConsultaVenda[]> {
  return this.http.get(`${this.baseXano}`+'/tb_vendas_by_date?dt_inicial='+dtInicial+'&dt_final='+dtfinal).pipe(
    tap((res: any) => {
      console.log('Resposta das vendas:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
    })
  );
}

//Buscar vendas por data de venda

//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_vendas_por_data_venda

getVendaPorDataVenda(dtInicial:string, dtfinal:string): Observable<ConsultaVenda[]> {
  return this.http.get(`${this.baseXano}`+'/tb_vendas_por_data_venda?dtVendaInicial='+dtInicial+'&dtVendaFinal='+dtfinal).pipe(
    tap((res: any) => {
      console.log('Resposta das vendas:', res);
      // ou: fazer algum pré-processamento aqui, se necessário
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

//Gravar Venda

//   https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_vendas
async postVenda(venda: Venda): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Caso use autenticação:
      // 'Authorization': `Bearer ${this.}`,
    });
    try {
      const response = await firstValueFrom(
        this.http.post(this.baseXano+'tb_vendas', venda, { headers })
      );
      console.log('Venda adicionada:', response);
    } catch (error: any) {
      console.error('Erro ao adicionar venda:', error);
      throw error;
    }
  }

  // Editar venda
  // https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_vendas/{tb_vendas_id}

async pathVenda(venda: Venda, idVenda: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Caso use autenticação:
      // 'Authorization': `Bearer ${this.}`,
    });
    try {
      const response = await firstValueFrom(
        this.http.patch(this.baseXano+`tb_vendas/${idVenda}`, venda, { headers })
  
      );
      console.log('Venda atualizada:', response);
    } catch (error: any) {
      console.error('Erro ao atualizar a venda:', error);
      throw error;
    }
  }




////////////////Operações com Forma de pagamento ///////////////////////////

//Get forma de pagamento
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_formapgto
getFormaPgto():  Observable<FormaPagamento[]>{
  return this.http.get(`${this.baseXano}`+'tb_formapgto').pipe(
    tap((res: any) =>{
      console.log('Resposta de pagamento:', res);
    })
  );

}

////////////////Operações com produtos ///////////////////////////////////
//Get Produtos
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tp_produto

getProdutos():  Observable<TipoProduto[]>{
  return this.http.get(`${this.baseXano}`+'/tp_produto').pipe(
    tap((res: any) =>{
      console.log('Resposta das vendas:', res);
    })
  );

}


////////////////Operações com Operadora ///////////////////////////

//Carregar operadoras():
//https://x8ki-letl-twmt.n7.xano.io/api:VtKxuYWy/tb_operadora

getOperadoras():  Observable<Operadora[]>{
  return this.http.get(`${this.baseXano}`+'tb_operadora').pipe(
    tap((res: any) =>{
      console.log('Resposta das operadoras:', res);
    })
  );

}


}
