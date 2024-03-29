import { User } from "../models/User";
import { UserJson } from "../models/UserJson";
import { read, write } from "./json";

const userJsonPath = "../data/users.json";
const defaultData = {
  users: [],
};

export const get = async (email: string): Promise<User | undefined> => {
  const data = await read<UserJson>(userJsonPath);
  return data?.users.find((user) => user.email === email);
};

export const upsert = async (user: User): Promise<boolean> => {
  const data = (await read<UserJson>(userJsonPath)) ?? defaultData;
  const existingUser = data.users.find((u) => u.email === user.email);
  if (existingUser) {
    data.users = data.users.map((dbUser) =>
      dbUser.email === user.email ? user : dbUser
    );
  } else {
    data.users.push(user);
  }

  return await write(userJsonPath, data);
};

export const remove = async (email: string) => {
  const data = await read<UserJson>(userJsonPath);
  if (data) {
    data.users = data.users.filter((user) => user.email != email);
    await write(userJsonPath, data);
  }
};
