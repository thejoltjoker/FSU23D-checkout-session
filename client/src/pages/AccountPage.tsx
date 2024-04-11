import UserSummary from "../components/UserSummary";
import { useUserContext } from "../contexts/UserContext";
// TODO update design
// TODO fix sign out button
const AccountPage = () => {
  const { user } = useUserContext();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl gap-8 py-24 pt-navbar">
      <div className="flex w-2/3 flex-col gap-4">
        <section className="mb-8">
          <h2 className="text-brown-950 pb-4 text-4xl">Your cart</h2>
          <ul className="flex flex-col gap-4">
            <li>Orders</li>
          </ul>
        </section>
      </div>
      <div className="w-1/3">
        <UserSummary />
      </div>
    </div>
  );
};

export default AccountPage;
