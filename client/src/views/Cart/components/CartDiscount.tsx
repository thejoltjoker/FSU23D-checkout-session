import PromotionEntry from "../../../components/PromotionEntry";
import RoundedContainer from "../../../components/RoundedContainer";
import { Coupon } from "../../../models/Coupon";

type CartDiscountProps = {
  setCoupon: (coupon: Coupon) => void;
};

const CartDiscount = ({ setCoupon }: CartDiscountProps) => {
  return (
    <RoundedContainer>
      <h4 className="text-2xl">Discount</h4>
      <p className="pb-4 text-brown-950/60">Have a discount code?</p>
      <PromotionEntry setCoupon={(value: Coupon) => setCoupon(value)} />
    </RoundedContainer>
  );
};

export default CartDiscount;
