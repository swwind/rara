import Card from "./Card";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <Card>
      <h1
        style={{
          margin: "15px 0 0",
          fontSize: "2em",
          lineHeight: "1em",
          fontWeight: "normal",
        }}
      >
        {title}
      </h1>
    </Card>
  );
}
