import { Price } from "./Price";

export interface Product {
  id: string;
  object: string;
  active: boolean;
  attributes: unknown[];
  created: number;
  default_price: Price;
  description: string;
  features: unknown[];
  images: string[];
  livemode: boolean;
  metadata: ProductMetadata;
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

export interface ProductMetadata {
  scientificName: string;
  slug: string;
  tags: string;
}
