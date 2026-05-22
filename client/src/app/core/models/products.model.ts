export interface IProduct {
  _id: string;
  title: string;
  description: string;
  images: [string];
  category: string;
  subCategory: string;
  rating:number
  sku: string;
  status: string;
  price: number;
  stock: number;
  slug: string;
  createdAt?: string;
}

export interface IProductsRes {
  message: string;
  data: IProduct[];
}

export interface IProductRes {
  message: string;
  data: IProduct;
}
