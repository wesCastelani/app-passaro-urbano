class ItemCarrinho {
  constructor(
    public id: number,
    public img: object,
    public titulo,
    public descricao_oferta: string,
    public valor: number,
    public quantidade: number
  ) {}
}

export { ItemCarrinho };
