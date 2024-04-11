import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SuccessSummary from "../components/SuccessSummary";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Session } from "../models/Session";
import { saveOrder } from "../services/orders.service";
import { Order } from "../schemas/OrderSchema";
import { v4 as uuidv4 } from "uuid";
// TODO add order to json file if successful

const SuccessPage = () => {
  const [session, setSession] = useState<Session>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  useEffect(() => {
    let ignore = false;
    if (session) return;
    const fetchSession = async () => {
      const response = await axios.get<Session>(
        `http://localhost:3000/api/checkout/session/${encodeURIComponent(sessionId)}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);

        if (data.payment_status === "paid") {
          const order: Order = {
            id: data.id,
            date: new Date(),
            customerId: data.customer?.id ?? data.customer_details.email,
            totalAmount: data.amount_total,
            servicePointId: data.metadata.servicePointId ?? "",
          };
          await saveOrder(order);
          localStorage.clear();
        }

        if (!ignore) {
          setSession(data);
        }
      }
    };
    fetchSession();
    return () => {
      ignore = true;
    };
  });
  return (
    <div className="mx-auto max-w-screen-xl pt-[16vh]">
      <div className="mx-auto max-w-sm">
        {session && <SuccessSummary session={session} />}
      </div>
    </div>
  );
};

export default SuccessPage;
