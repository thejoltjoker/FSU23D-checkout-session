import { User } from "../models/User";
import { post } from "./http.service";

export class Endpoint {
  public static baseUrl = "http://localhost:3000/api/";
  public static login: string = `${Endpoint.baseUrl}user/login`;
  public static register: string = `${Endpoint.baseUrl}user/register`;

  constructor() {}

  public static search(query: string) {
    return `${Endpoint.baseUrl}user/${encodeURIComponent(query)}`;
  }
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const body = { email: email, password: password };
    const response = await post<User>(Endpoint.login, JSON.stringify(body));
    return response.data;
  } catch (error) {
    console.error("Error while logging in");
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  try {
    const body = { name: name, email: email, password: password };
    const response = await post<User>(Endpoint.register, JSON.stringify(body));
    return response.data;
  } catch (error) {
    console.error("Error while registering user");
    throw error;
  }
};
