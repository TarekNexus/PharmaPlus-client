export type Medicine = {
    id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  Manufacturer?: string;
  category:{
    id: string;
    name: string;
  }
  seller:{
    name: string;
    email: string;
  }
};

export type Category = {
  id: string;
  name: string;
};