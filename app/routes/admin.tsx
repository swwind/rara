import { Outlet } from "remix";
import { TextAdmin } from "~/src/Text";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";

export default function Admin() {
  return (
    <Space direction="vertical" gap={20}>
      <Title title={<TextAdmin />} />
      <Outlet />
    </Space>
  );
}

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
