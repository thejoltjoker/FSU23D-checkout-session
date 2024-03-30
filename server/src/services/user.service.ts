import { User } from "../models/User";
import { UsersJson } from "../models/UsersJson";
import { read, write } from "./json.service";
import path from "path";
const userJsonPath = path.resolve(__dirname, "../data/users.json");
const defaultData = {
  users: [],
};

export const get = async (email: string): Promise<User | undefined> => {
  try {
    const data = await read<UsersJson>(userJsonPath);

    if (!data) return undefined;

    return data.users.find((user) => user.email === email);
  } catch (error) {
    return undefined;
  }
};

export const upsert = async (user: User): Promise<boolean> => {
  const data = (await read<UsersJson>(userJsonPath)) ?? defaultData;
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
  const data = await read<UsersJson>(userJsonPath);
  if (data) {
    data.users = data.users.filter((user) => user.email != email);
    await write(userJsonPath, data);
  }
};
