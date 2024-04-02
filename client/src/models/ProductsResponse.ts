export interface ProductsResponse {
  object: string;
  data: Product[];
  has_more: boolean;
  url: string;
}

export interface Product {
  id: string;
  object: string;
  active: boolean;
  attributes: unknown[];
  created: number;
  default_price: string;
  description: string;
  features: unknown[];
  images: string[];
  livemode: boolean;
  metadata: Metadata;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export interface Metadata {
  scientificName: string;
  slug: string;
  tags: string;
}
