import { User } from "../models/User";
import { UserJson } from "../models/UserJson";
import { read, write } from "./json";

const userJsonPath = "../data/users.json";
const defaultData = {
  users: [],
};

export const get = async (userId: string): Promise<User | undefined> => {
  const data = await read<UserJson>(userJsonPath);
  return data?.users.find((user) => user.userId === userId);
};

export const create = async (user: User): Promise<User | undefined> => {
  const data = (await read<UserJson>(userJsonPath)) ?? defaultData;
  const existingUser = data.users.find((u) => u.userId === user.userId);
  if (existingUser) {
    return existingUser;
  }

  data.users.push(user);
  await write(userJsonPath, data);
  return user;
};

export const update = async (userId: string, user: User): Promise<boolean> => {
  const data = (await read<UserJson>(userJsonPath)) ?? defaultData;
  const existingUser = data.users.find((u) => u.userId === user.userId);
  if (existingUser) {
    data.users = data.users.map((dbUser) =>
      dbUser.userId === userId ? { dbUser, ...user } : dbUser
    );
  }

  data.users.push(user);
  return await write(userJsonPath, data);
};

export const remove = async (userId: string) => {
  const data = await read<UserJson>(userJsonPath);
  if (data) {
    data.users = data.users.filter((user) => user.userId != userId);
    await write(userJsonPath, data);
  }
};
