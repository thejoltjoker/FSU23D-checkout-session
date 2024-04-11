import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Button } from "./Button";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        { withCredentials: true },
      );
      console.log(response.data);
      if (response.status === 200) {
        setUser(undefined);
        navigate("/");
      }
    } catch (error) {
      console.error("Error when logging out user");
    }
  };
  return <Button onPress={handleClick}>Log out</Button>;
};

export default LogoutButton;
