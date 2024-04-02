import Stripe from "stripe";

export interface Product extends Stripe.Product {
  metadata: Metadata;
}

export interface Metadata extends Stripe.Metadata {
  slug: string;
  scientificName: string;
  tags: string;
}
