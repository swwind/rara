import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";

export default function NotFound() {
  return (
    <Card header={<CardTitle title="$nothing" />}>
      <p className="not-found__large">Empty</p>
    </Card>
  );
}
