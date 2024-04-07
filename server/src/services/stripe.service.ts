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

export const retrieveCustomer = async (customerId: string) => {
  try {
    const response = await stripe.customers.retrieve(customerId);
    return response;
  } catch (error) {
    console.error("Error when retrieving customer", error);
    throw error;
  }
};

export const searchCustomers = async (query: string) => {
  try {
    const response = await stripe.customers.search({
      query: query,
    });

    return response;
  } catch (error) {
    console.error("Error when searching for customer", error);
    throw error;
  }
};

export const retrieveProduct = async (
  productId: string,
  params?: Stripe.ProductRetrieveParams
): Promise<Stripe.Response<Stripe.Product>> => {
  try {
    const response = await stripe.products.retrieve(productId, params);
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

export const listPrices = async (
  params?: Stripe.PriceListParams
): Promise<Stripe.Response<Stripe.ApiList<Stripe.Price>>> => {
  try {
    const response = await stripe.prices.list(params);
    return response;
  } catch (error) {
    console.error("Error when listing prices", error);
    throw error;
  }
};

export const listCoupons = async (
  params?: Stripe.CouponListParams
): Promise<Stripe.Response<Stripe.ApiList<Stripe.Coupon>>> => {
  try {
    const response = await stripe.coupons.list(params);
    return response;
  } catch (error) {
    console.error("Error when listing coupons", error);
    throw error;
  }
};

export const createCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams
): Promise<Stripe.Response<Stripe.Checkout.Session>> => {
  try {
    const session = await stripe.checkout.sessions.create(params);
    console.log(session);
    return session;
  } catch (error) {
    console.error("Error when creating checkout session", error);
    throw error;
  }
};

export const retrieveCheckoutSession = async (
  sessionId: string
): Promise<Stripe.Response<Stripe.Checkout.Session>> => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);
    return session;
  } catch (error) {
    console.error("Error when retrieving checkout session", error);
    throw error;
  }
};
