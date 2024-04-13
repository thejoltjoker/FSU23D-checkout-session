import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Order } from "../../schemas/OrderSchema";
import AccountOrderList from "./components/AccountOrderList";
import AccountSummary from "./components/AccountSummary";

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
      <section className="mb-8 basis-2/3">
        <AccountOrderList orders={orders ?? []} />
      </section>
      <section className="shrink grow basis-1/3">
        <AccountSummary />
      </section>
    </div>
  );
};

export default AccountPage;
