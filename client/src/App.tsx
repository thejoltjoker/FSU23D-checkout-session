import axios from "axios";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { User } from "./models/User";
import { router } from "./routers/MainRouter";

const App = () => {
  const [user, setUser] = useState<User>();
  // const [shoppingCart, setShoppingCart] = useState<Product[]>([]);

  // const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  // <ShoppingCartContext.Provider value={{ state, dispatch }}>
  //   {children}
  // </ShoppingCartContext.Provider>

  useEffect(() => {
    let ignore = false;
    if (user) return;
    const authorize = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/user/authorize",
        { withCredentials: true },
      );

      console.log(response);
      if (response.status === 200) {
        setUser(new User(response.data));
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
        {/* <ShoppingCartContext.Provider
          value={{ cart: shoppingCart, setCart: setShoppingCart }}
        > */}
        <RouterProvider router={router} />
        {/* </ShoppingCartContext.Provider> */}
      </UserContext.Provider>
    </>
  );
};

export default App;
