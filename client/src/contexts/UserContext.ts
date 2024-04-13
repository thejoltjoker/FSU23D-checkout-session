import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { User } from "../schemas/UserSchema";

export interface UserContent {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContent>({
  user: undefined,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
