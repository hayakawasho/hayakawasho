import type { FC } from "react";

export const Link: FC<{
  className?: string;
  children: React.ReactNode;
  swap?: string;
  to: string;
}> = ({ className, to, children, swap = "swap:501ms", ...props }) => {
  return (
    <a
      {...props}
      className={`${className} cursor-pointer`}
      hx-get={to}
      hx-push-url="true"
      hx-select="[data-xhr]"
      hx-target="#main"
      hx-swap={`${swap}`}
    >
      {children}
    </a>
  );
};
