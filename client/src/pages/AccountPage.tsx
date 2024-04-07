import Button from "../components/Button";
import { useUserContext } from "../contexts/UserContext";

const AccountPage = () => {
  const { user } = useUserContext();
  return (
    <div className="-mt-navbar flex h-screen">
      <div className="h-screen w-1/2 bg-fern-200">
        <img
          src="/img/login-cactus.jpg"
          alt=""
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="relative flex w-1/2 items-center bg-white">
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-center text-6xl">Account</h2>
          <p>Email: {user?.email}</p>
          <Button>Sign out</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
