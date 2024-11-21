export interface IFormDish {
  title: string;
  price: number;
  image: string;
}

export interface IDish extends IFormDish {
  id: string;
}

export interface APIDish {
  [id: string] : IDish;
}

export interface IDishOrder {
  orderDish: IDish;
  amount: number;
}

export interface IOrderDish {
  [id: string] : number;
}

export interface APIOrder {
  [id: string]: IOrderDish;
}

