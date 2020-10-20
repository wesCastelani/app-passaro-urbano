import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    endereco: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(120),
    ]),
    numero: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    complemento: new FormControl(null),
    formaPagamento: new FormControl(null, [Validators.required]),
  });

  itensCarrinho: ItemCarrinho[] = [];
  idPedidoCompra: number;

  constructor(
    private carrinhoService: CarrinhoService,
    private ordemCompraService: OrdemCompraService
  ) {}

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    if (this.carrinhoService.exibirItens().length === 0) {
      alert('Você não selecionou nenhum item');
    } else {
      let pedido: Pedido = new Pedido(
        this.form.value.endereco,
        this.form.value.numero,
        this.form.value.complemento,
        this.form.value.formaPagamento,
        this.carrinhoService.exibirItens()
      );
      this.ordemCompraService
        .efetivarCompra(pedido)
        .subscribe((pedido: any) => {
          this.idPedidoCompra = pedido.id;
          this.carrinhoService.limparCarrinho();
        });
    }
  }

  public adiciona(item: ItemCarrinho): void {
    this.carrinhoService.addQuantidade(item);
  }

  public diminui(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
}
