import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useUserContext } from "../contexts/UserContext";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await login(email, password);
      if (response) {
        setUser(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(user);
    if (user?.email) navigate("/account");
  }, [user, navigate]);
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-4xl bg-banana-50 p-8 shadow-box md:p-12">
        <h2 className="mb-8 text-center text-3xl md:text-4xl">Login</h2>

        <form
          className="flex flex-col gap-4 px-2 text-center"
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
            By logging in, you acknowledge and agree to the{" "}
            <a href="" className="text-fern-500">
              terms and conditions
            </a>
            .
          </p>
          {isError && (
            <p className="text-brown-950/60">Wrong username or password</p>
          )}
          <Button type="submit" isDisabled={isLoading} className="mx-auto w-40">
            {isLoading ? "Logging in" : "Log in"}
          </Button>
        </form>
        <p className="w-full pt-8 text-center">
          First time at King Kong's?{" "}
          <Link to="/register" className="text-brown-800">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
