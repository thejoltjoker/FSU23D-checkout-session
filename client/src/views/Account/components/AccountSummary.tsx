import RoundedContainer from "../../../components/RoundedContainer";
import LogoutButton from "../../../components/buttons/LogoutButton";
import { useUserContext } from "../../../contexts/UserContext";

const AccountSummary = () => {
  const { user } = useUserContext();

  return (
    <section>
      <h2 className="pb-4 text-4xl text-brown-950">Account</h2>
      <RoundedContainer>
        <div className="flex flex-wrap gap-2">
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
      </RoundedContainer>
    </section>
  );
};

export default AccountSummary;
