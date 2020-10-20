import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
})
export class ComoUsarComponent implements OnInit {
  public comoUsar: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((param: Params) => {
      this.ofertasService
        .getComoUsarOfertaByid(param.id)
        .then((res: string) => {
          this.comoUsar = res;
        });
    });
  }
}
