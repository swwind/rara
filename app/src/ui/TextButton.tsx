import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TextButton({ children }: Props) {
  return <span className="rara-button-text">{children}</span>;
}
