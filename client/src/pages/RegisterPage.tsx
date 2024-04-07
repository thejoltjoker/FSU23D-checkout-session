import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../models/User";
import { register } from "../services/auth.service";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await register(email, password);
    if (response) {
      setUser(new User(email));
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(user);
    if (user?.email) navigate("/account");
  }, [user, navigate]);
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
          <h2 className="mb-4 text-center text-6xl">Register</h2>

          <form
            className="flex flex-col gap-4 px-12 text-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              className="h-12 rounded-full border-dawn-400 px-5 placeholder:text-sm placeholder:text-dawn-400"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email"
            />
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <input
              className="h-12 rounded-full border-dawn-400 px-5 placeholder:text-sm placeholder:text-dawn-400"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
            />
            <p className="text-sm">
              By signing up, you acknowledge and agree to the{" "}
              <a href="" className="text-fern-500">
                terms and conditions
              </a>
              .
            </p>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up" : "Create account"}
            </Button>
          </form>
        </div>
        <p className="absolute bottom-8 w-full text-center">
          First time at Cactify?{" "}
          <a href="" className="text-fern-500">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
