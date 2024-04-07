import axios from "axios";
import Stripe from "stripe";
import { ServicePointByPostalCodeResponse } from "../models/Postnord";

export const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "", {
  apiVersion: "2023-10-16",
});

export const servicePointsFromPostalCode = async (
  postalCode: string
): Promise<ServicePointByPostalCodeResponse> => {
  try {
    const options = {
      method: "GET",
      url: "https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/bypostalcode",
      params: {
        returnType: "json",
        countryCode: "SE",
        postalCode: postalCode,
        context: "optionalservicepoint",
        located: "all",
        whiteLabelName: "false",
        apikey: process.env.POSTNORD_API_KEY,
      },
      headers: {
        accept: "application/json",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error when creating customer", error);
    throw error;
  }
};
