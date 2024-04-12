import { useUserContext } from "../contexts/UserContext";
import LogoutButton from "./LogoutButton";

const UserSummary = () => {
  const { user } = useUserContext();

  return (
    <section>
      <h2 className="pb-4 text-4xl text-brown-950">Account</h2>
      <div className="flex flex-wrap gap-2 rounded-3xl bg-banana-50 p-8 text-lg shadow-box">
        <p className="shrink grow basis-1/3 font-heading font-bold uppercase">
          Name
        </p>
        <p className="shrink grow basis-1/3 text-right">{user?.name}</p>
        <p className="shrink grow basis-1/3 font-heading font-bold uppercase">
          Email
        </p>
        <p className="shrink grow basis-1/3 text-right">{user?.email}</p>
        <p className="shrink grow basis-1/3 font-heading font-bold uppercase">
          Id
        </p>
        <p className="shrink grow basis-1/2 text-right">{user?.customerId}</p>
        <div className="w-full pt-8">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
};

export default UserSummary;
