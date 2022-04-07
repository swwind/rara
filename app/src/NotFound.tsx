import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";

export default function NotFound() {
  return (
    <Card header={<CardTitle title="404 not found" />}>
      <p style={{ fontSize: "4em" }}>😅</p>
    </Card>
  );
}
