import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../models/User";
import { register } from "../services/auth.service";

// TODO add validation
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await register(name, email, password);
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
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="bg-banana-50 rounded-4xl shadow-box max-w-md p-8">
        <h2 className="mb-8 text-center text-5xl">Create account</h2>

        <form
          className="flex flex-col gap-4 px-12 text-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="email" className="hidden">
            Name
          </label>
          <input
            className="h-12 rounded-full border-dawn-400 px-5 placeholder:text-sm placeholder:text-dawn-400"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Name"
          />
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
            By creating an account, you acknowledge and agree to the{" "}
            <a href="" className="text-fern-500">
              terms and conditions
            </a>
            .
          </p>
          <Button type="submit" isDisabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="w-full pt-8 text-center">
          Already a customer?{" "}
          <Link to="/register" className="text-brown-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
