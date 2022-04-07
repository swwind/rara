type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function Layout({ children, sidebar }: Props) {
  return (
    <div className="rara-layout">
      <div className="rara-layout-main">{children}</div>
      <div className="rara-layout-left">{sidebar}</div>
    </div>
  );
}
