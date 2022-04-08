import React from "react";

type Props = {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
  /**
   * Space gap (default 5px)
   */
  gap?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Space({ direction, children, gap, ...props }: Props) {
  props.className = `rara-space rara-space-${direction} ${
    props.className || ""
  }`;
  props.style = props.style ?? {};
  props.style.gap = gap ?? 5;

  return <div {...props}>{children}</div>;
}
