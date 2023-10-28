import type { FC } from "react";

export const Link: FC<{
  className?: string;
  children: React.ReactNode;
  swap?: string;
  to: string;
}> = ({ className = "", to, children, swap = "swap:520ms", ...props }) => {
  return (
    <a
      {...props}
      className={`${className} cursor-pointer`}
      hx-get={to}
      hx-push-url="true"
      hx-select="[data-xhr]"
      hx-swap={`${swap}`}
      hx-target="#main"
    >
      {children}
    </a>
  );
};
