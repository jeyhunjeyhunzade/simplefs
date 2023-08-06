import { PropsWithChildren } from "react";

const Button = ({ children }: PropsWithChildren) => {
  return (
    <button className="ml-2 rounded-md bg-[#000000] p-1.5 px-4 font-mono font-bold text-white">
      {children}
    </button>
  );
};

export default Button;
