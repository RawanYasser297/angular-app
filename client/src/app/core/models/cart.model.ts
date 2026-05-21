import { IProduct } from "./products.model";

export interface ICartItem {
  product: {
    title: string;
    slug: string;
    image: string;
    price: number;
  };
  quantity: number;
  price: number;
}



export interface CartResponse {
  data: ICartItem[];
}

export interface MessageResponse {
  message: string;
}