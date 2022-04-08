import React from "react";
import { NavLink, useLocation, useSearchParams } from "remix";
import { parsePage } from "~/utils/utils";

type PaginatorItemProps = (
  | {
      to: string;
      disabled: false;
    }
  | {
      disabled: true;
    }
) & {
  children: React.ReactNode;
};

function PaginatorItem(props: PaginatorItemProps) {
  if (props.disabled) {
    return (
      <span className="rara-paginator-item rara-paginator-item-disable">
        {props.children}
      </span>
    );
  } else {
    return (
      <NavLink to={props.to} className="rara-paginator-item">
        {props.children}
      </NavLink>
    );
  }
}

type Props = {
  total: number;
};

export default function Paginator({ total }: Props) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const now = parsePage(searchParams.get("p"));

  const getLocation = (page: number) => {
    return location.pathname + (page === 1 ? "" : `?p=${page}`);
  };

  const min = Math.max(1, now - 2);
  const max = Math.min(total, now + 2);

  return (
    <nav className="rara-paginator">
      <PaginatorItem to={getLocation(now - 1)} disabled={now === 1}>
        «
      </PaginatorItem>
      {min > 1 ? (
        <>
          <PaginatorItem to={getLocation(1)} disabled={false}>
            1
          </PaginatorItem>
          <PaginatorItem disabled={true}>…</PaginatorItem>
        </>
      ) : null}
      {[...Array(max - min + 1)].map((_, i) => {
        const page = min + i;
        return (
          <PaginatorItem key={i} to={getLocation(page)} disabled={now === page}>
            {page}
          </PaginatorItem>
        );
      })}
      {max < total ? (
        <>
          <PaginatorItem disabled={true}>…</PaginatorItem>
          <PaginatorItem to={getLocation(total)} disabled={false}>
            {total}
          </PaginatorItem>
        </>
      ) : null}
      <PaginatorItem to={getLocation(now + 1)} disabled={now === total}>
        »
      </PaginatorItem>
    </nav>
  );
}
