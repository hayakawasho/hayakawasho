import type { FC } from "react";

export const Svgsprite: FC = () => {
  return (
    <svg
      aria-hidden="true"
      style={{
        height: 0,
        overflow: "hidden",
        position: "absolute",
        width: 0,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol id="icon-arrow_right" viewBox="0 0 63 32">
        <path d="M45.926 31.443q-0.557-0.557-0.557-1.393t0.557-1.393l10.646-10.646h-54.592q-0.805 0-1.393-0.588t-0.588-1.393 0.588-1.393 1.393-0.588h54.654l-10.646-10.646q-0.619-0.557-0.619-1.393t0.619-1.393q0.557-0.619 1.393-0.619t1.393 0.619l14.050 13.988q0.557 0.557 0.557 1.393t-0.557 1.393l-14.112 14.050q-0.557 0.557-1.393 0.557t-1.393-0.557z"></path>
      </symbol>
    </svg>
  );
};
