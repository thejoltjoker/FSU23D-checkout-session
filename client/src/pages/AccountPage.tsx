// TODO show order details
import { useEffect, useState } from "react";
import UserSummary from "../components/UserSummary";
import { useUserContext } from "../contexts/UserContext";

import axios from "axios";
import AccountOrderListItem from "../components/AccountOrderListItem";
import { Order } from "../schemas/OrderSchema";

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
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 py-24 pt-navbar md:flex-row">
      <div className="flex basis-2/3 flex-col gap-4">
        <section className="mb-8">
          <h2 className="pb-4 text-4xl text-brown-950">Order history</h2>
          <ul className="flex flex-col gap-4">
            {orders?.map((order) => <AccountOrderListItem order={order} />)}
          </ul>
        </section>
      </div>
      <div className="shrink grow basis-1/3">
        <UserSummary />
      </div>
    </div>
  );
};

export default AccountPage;
