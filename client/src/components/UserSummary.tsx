// TODO Disallow checkout without signing in first
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../contexts/UserContext";

type UserSummaryProps = {};
const UserSummary = (props: UserSummaryProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="text-brown-950 pb-4 text-4xl">Account</h2>
      <div className="bg-banana-50 shadow-box flex flex-wrap gap-2 rounded-3xl p-8 text-lg">
        <p className="font-heading shrink grow basis-1/3 font-bold uppercase">
          Name
        </p>
        <p className="shrink grow basis-1/3 text-right">{user?.name}</p>
        <p className="font-heading shrink grow basis-1/3 font-bold uppercase">
          Email
        </p>
        <p className="shrink grow basis-1/3 text-right">{user?.email}</p>
        <p className="font-heading shrink grow basis-1/3 font-bold uppercase">
          Id
        </p>
        <p className="shrink grow basis-1/2 text-right">{user?.customerId}</p>
      </div>
    </section>
  );
};

export default UserSummary;
