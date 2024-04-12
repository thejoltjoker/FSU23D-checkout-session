import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CancelSummary from "../components/CancelSummary";
import { Session } from "../models/Session";

const CancelPage = () => {
  const [session, setSession] = useState<Session>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  useEffect(() => {
    let ignore = false;
    if (session) return;
    const fetchSession = async () => {
      const response = await axios.get<Session>(
        `http://localhost:3000/api/checkout/session/${encodeURIComponent(sessionId ?? "")}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;

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
        {session && <CancelSummary session={session} />}
      </div>
    </div>
  );
};

export default CancelPage;
