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

export interface IDishCart {
  cardDish: IDish;
  amount: number;
}