export interface Coupon {
  id: string;
  valid: boolean;
  amount_off: number | null;
  percent_off: number | null;
}
