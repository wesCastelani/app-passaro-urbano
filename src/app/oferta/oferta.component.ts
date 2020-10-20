import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CarrinhoService } from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService],
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoCompra: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.ofertasService.getOfertaById(param.id).then((oferta: Oferta) => {
        this.oferta = oferta;
      });
    });
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoCompra.incluirItem(this.oferta);
  }
}
