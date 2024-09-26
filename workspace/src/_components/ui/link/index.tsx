export const Linkable: React.FC<{
  className?: string;
  children: React.ReactNode;
  swap?: string;
  href: string;
}> = ({ className = "", href, children, swap = "swap:0.45s", ...props }) => {
  return (
    <a
      {...props}
      className={`${className} cursor-pointer`}
      href={href}
      hx-get={href}
      hx-push-url="true"
      hx-select="[data-xhr]"
      hx-swap={`${swap}`}
      hx-target="#main"
    >
      {children}
    </a>
  );
};
