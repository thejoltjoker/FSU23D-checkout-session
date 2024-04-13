import { ReactNode } from "react";

type Props = { children: ReactNode };

const RoundedContainer = ({ children }: Props) => {
  return (
    <div className="rounded-3xl bg-banana-50 p-8 text-lg shadow-box">
      {children}
    </div>
  );
};

export default RoundedContainer;
