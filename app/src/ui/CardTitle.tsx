import React from "react";

type Props = {
  title: React.ReactNode;
};

export default function CardTitle({ title }: Props) {
  return (
    <header className="rara-card-title">
      <h3>{title}</h3>
    </header>
  );
}
