import { format } from "date-fns";
import { Order } from "../../../schemas/OrderSchema";

interface AccountOrderListItemProps {
  order: Order;
}

const AccountOrderListItem = ({ order }: AccountOrderListItemProps) => {
  return (
    <li className="flex flex-wrap items-center gap-1 rounded-3xl bg-banana-50 p-8 shadow-box">
      <h6 className="shrink grow basis-1/3">Order ID</h6>
      <p className="ml-auto shrink grow basis-1/3">{order.id}</p>
      <h6 className="shrink grow basis-1/3">Date</h6>
      <p className="ml-auto shrink grow basis-1/3">
        {format(order.date, "d MMM',' yyyy',' HH:mm")}
      </p>
      <h6 className="shrink grow basis-1/3">Amount</h6>
      <p className="ml-auto shrink grow basis-1/3">
        <span className="text-fern-500">$ </span>
        <span className="font-bold">{order.totalAmount / 100}</span>
      </p>
    </li>
  );
};

export default AccountOrderListItem;
