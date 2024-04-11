import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ShoppingCartContext } from "./contexts/ShoppingCartContext";
import { UserContext } from "./contexts/UserContext";
import { User } from "./models/User";
import {
  initialState,
  shoppingCartReducer,
} from "./reducers/shoppingCartReducer";
import { router } from "./routers/MainRouter";

const App = () => {
  const [user, setUser] = useState<User>();
  const [items, dispatch] = useReducer(shoppingCartReducer, initialState);

  useEffect(() => {
    let ignore = false;
    if (user) return;
    const authorize = async () => {
      const response = await axios.get<User>(
        "http://localhost:3000/api/user/authorize",
        { withCredentials: true },
      );

      console.log(response);
      if (response.status === 200) {
        setUser(response.data);
      }
    };
    if (!ignore) authorize();
    return () => {
      ignore = true;
    };
  });
  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <ShoppingCartContext.Provider value={{ items, dispatch }}>
          <RouterProvider router={router} />
        </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
