import { Product } from "./Product";

export interface ProductsResponse {
  object: string;
  data: Product[];
  has_more: boolean;
  url: string;
}
