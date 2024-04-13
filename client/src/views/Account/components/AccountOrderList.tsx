import { Order } from "../../../schemas/OrderSchema";
import AccountOrderListItem from "./AccountOrderListItem";

interface AccountOrderListProps {
  orders: Order[];
}

const AccountOrderList = ({ orders }: AccountOrderListProps) => {
  return (
    <div>
      <h2 className="pb-4 text-4xl text-brown-950">Order history</h2>
      <ul className="flex flex-col gap-4">
        {orders?.map((order) => <AccountOrderListItem order={order} />)}
      </ul>
    </div>
  );
};

export default AccountOrderList;
