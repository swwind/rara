import Card from "./Card";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <Card>
      <div className="rara-title">
        <h1>{title}</h1>
      </div>
    </Card>
  );
}
