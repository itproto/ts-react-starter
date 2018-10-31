type ProductColor = string;
export interface IProduct {
  name: string;
  price: number;
  color: ProductColor;
}

export type ProductColorMap = Map<ProductColor, ProductColor>;
export type ProductColorMapping = { [key: string]: ProductColor };
