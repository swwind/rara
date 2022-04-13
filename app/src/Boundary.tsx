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
  const title = `${caught.status} ${caught.statusText}`;

  return (
    <Card header={<CardTitle title={title} />}>
      <p>{caught.data}</p>
    </Card>
  );
}
