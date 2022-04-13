import { useCatch } from "remix";
import Card from "./ui/Card";
import CardTitle from "./ui/CardTitle";

export function ErrorBoundary({ error }: { error: Error }) {
  const title = `Error: ${error.message}`;

  return (
    <Card header={<CardTitle title={title} />}>
      {error.stack && (
        <pre>
          <code>{error.stack}</code>
        </pre>
      )}
    </Card>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const title = `Error: ${caught.status} ${caught.statusText}`;

  return (
    <Card header={<CardTitle title={title} />}>
      {caught.data && (
        <pre>
          <code>{caught.data}</code>
        </pre>
      )}
    </Card>
  );
}
