import Link, { LinkProps } from "next/link";
import React from "react";

export const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
);
