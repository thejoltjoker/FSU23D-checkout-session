import Stripe from "stripe";
import { Customer } from "../schemas/CustomerSchema";

export const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "", {
  apiVersion: "2023-10-16",
});

export const createCustomer = async (customer: Customer) => {
  try {
    const response = await stripe.customers.create(customer);
    return response;
  } catch (error) {
    console.error("Error when creating customer", error);
    throw error;
  }
};

export const updateCustomer = async (
  customerId: string,
  customer: Customer
) => {
  try {
    const response = await stripe.customers.update(customerId);
    return response;
  } catch (error) {
    console.error("Error when retrieving customer", error);
    throw error;
  }
};

export const retrieveCustomer = async (customerId: string) => {
  try {
    const response = await stripe.customers.retrieve(customerId);
    return response;
  } catch (error) {
    console.error("Error when retrieving customer", error);
    throw error;
  }
};

export const retrieveProduct = async (
  productId: string
): Promise<Stripe.Response<Stripe.Product>> => {
  try {
    const response = await stripe.products.retrieve(productId);
    return response;
  } catch (error) {
    console.error("Error when retrieving product", error);
    throw error;
  }
};

export const listProducts = async (
  params?: Stripe.ProductListParams
): Promise<Stripe.Response<Stripe.ApiList<Stripe.Product>>> => {
  try {
    const response = await stripe.products.list(params);
    return response;
  } catch (error) {
    console.error("Error when listing products", error);
    throw error;
  }
};
