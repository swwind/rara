import React from "react";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export default function Card({ header, children }: Props) {
  return (
    <div className="rara-card">
      {header}
      <div className="rara-card-content">{children}</div>
    </div>
  );
}
