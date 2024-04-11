// TODO Disallow checkout without signing in first
import getSymbolFromCurrency from "currency-symbol-map";
import _ from "lodash";

import { useUserContext } from "../contexts/UserContext";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Session } from "../models/Session";
import { Button } from "./Button";

type SuccessSummaryProps = {
  session: Session;
};
const SuccessSummary = ({ session }: SuccessSummaryProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const currencySymbol = getSymbolFromCurrency(session.currency || "$");

  return (
    <section>
      <h2 className="text-brown-950 pb-4 text-center text-4xl">Summary</h2>
      <div className="bg-banana-50 shadow-box grid grid-cols-2 gap-2 rounded-3xl p-8 text-lg">
        <p>Status</p>
        <p className="flex items-center justify-end">
          {session?.payment_status ? (
            <span className="text-fern-500">
              <FaCircleCheck />
            </span>
          ) : (
            <span className="text-red-500">
              <FaCircleXmark />
            </span>
          )}
        </p>
        {/* <p>Discount code</p>
        <p className="text-right">{session ? session.id : "None"}</p> */}
        <p>Shipping</p>
        <p className="text-right">Free</p>
        <p>Tax</p>
        <p className="text-right">
          {currencySymbol} {_.round(session.total_details.amount_tax / 100, 2)}
        </p>
        <p>Discount</p>
        <p className="text-right">
          {currencySymbol}{" "}
          {_.round(session.total_details.amount_discount / 100, 2)}
        </p>
        <p>Subtotal</p>
        <p className="text-right">
          {currencySymbol} {_.round(session.amount_subtotal / 100, 2)}
        </p>
        <hr className="col-span-full border-dawn-300" />
        <p className="font-bold">Total</p>
        <p className="text-right font-bold">
          {currencySymbol} {_.round(session.amount_total / 100, 2)}
        </p>
        <Button className="col-span-full mt-8" onPress={() => navigate("/")}>
          Continue shopping
        </Button>
      </div>
    </section>
  );
};

export default SuccessSummary;
