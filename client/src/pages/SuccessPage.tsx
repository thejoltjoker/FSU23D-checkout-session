import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SuccessSummary from "../components/SuccessSummary";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Session } from "../models/Session";
// TODO add order to json file if successful
// TODO clear cart
const SuccessPage = () => {
  const [session, setSession] = useState<Session>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useShoppingCartContext();
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
        if (!ignore) {
          setSession(data);
        }
        if (response.data.status) {
          // TODO save order to json
          localStorage.clear();
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
