export interface Product {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  currency: string;
  slug: string;
  stock: number;
  category: string;
  tags: string[];
}
