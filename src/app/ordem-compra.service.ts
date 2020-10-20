import { Injectable } from '@angular/core';

import { Pedido } from './shared/pedido.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from './app.api';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public efetivarCompra(pedido: any): Observable<any> {
    return this.httpClient.post<any>(
      `${API_URL}pedidos`,
      pedido,
      this.httpOptions
    );
  }
}
