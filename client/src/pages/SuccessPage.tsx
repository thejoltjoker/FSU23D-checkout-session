import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// TODO add order to json file if successful
const SuccessPage = () => {
  const [session, setSession] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  useEffect(() => {
    let ignore = false;
    if (session) return;
    const fetchSession = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/checkout/session/${encodeURIComponent(sessionId)}`,
        { withCredentials: true },
      );
      if (response.status === 200) {
        const data = response.data;
        if (!ignore) setSession(data);
      }
    };
    fetchSession();
    return () => {
      ignore = true;
    };
  });
  return (
    <div>
      SuccessPage
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default SuccessPage;
