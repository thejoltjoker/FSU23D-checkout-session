import { useState, useEffect } from "react";
import UserSummary from "../components/UserSummary";
import { useUserContext } from "../contexts/UserContext";

import { Order } from "../schemas/OrderSchema";
import axios from "axios";
// TODO update design
// TODO fix sign out button
const AccountPage = () => {
  const { user } = useUserContext();

  const [orders, setOrders] = useState<Order[]>();
  useEffect(() => {
    let ignore = false;
    if (orders) return;
    const fetchProducts = async () => {
      const response = await axios.get<Order[]>(
        `http://localhost:3000/api/orders/${user?.customerId}`,
        { withCredentials: true },
      );
      if (response.status === 200) {
        const data = response.data;
        if (!ignore) setOrders(data);
      }
    };
    user && fetchProducts();
    return () => {
      ignore = true;
    };
  });

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl gap-8 py-24 pt-navbar">
      <div className="flex w-2/3 flex-col gap-4">
        <section className="mb-8">
          <h2 className="pb-4 text-4xl text-brown-950">Your cart</h2>
          <ul className="flex flex-col gap-4">
            {orders?.map((order) => <li>{order.id}</li>)}
          </ul>
        </section>
      </div>
      <div className="w-1/3">
        <UserSummary />
      </div>
    </div>
  );
};

export default AccountPage;
