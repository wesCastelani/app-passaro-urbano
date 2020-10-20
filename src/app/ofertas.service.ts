import { Oferta } from './shared/oferta.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from './app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {
  constructor(private http: HttpClient) {}

  public getOfertas(): Promise<any[]> {
    return this.http.get(`${API_URL}ofertas?destaques=true`).toPromise().then();
  }
  public getOfertasPorCaregoria(categoria: string): Promise<Oferta[]> {
    return this.http
      .get(`${API_URL}ofertas?categoria=${categoria}`)
      .toPromise()
      .then();
  }
  public getOfertaById(id: number): Promise<Oferta> {
    return this.http.get(`${API_URL}ofertas/${id}`).toPromise().then();
  }

  public getComoUsarOfertaByid(id: number): Promise<string> {
    return this.http
      .get(`${API_URL}como-usar?id=${id}`)
      .toPromise()
      .then((res: Response) => {
        return res[0].descricao;
      });
  }

  public getOndeFicaOfertaByid(id: number): Promise<string> {
    return this.http
      .get(`${API_URL}onde-fica?id=${id}`)
      .toPromise()
      .then((res: Response) => {
        return res[0].descricao;
      });
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http
      .get(`${API_URL}ofertas?descricao_oferta_like=${termo}`)
      .pipe(retry(10))
      .pipe(map((res: any) => res));
  }
}
