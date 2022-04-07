import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

type Props = {
  categories: string[];
};

export default function CategoryList({ categories }: Props) {
  return (
    <Card header={<CardTitle title="📁 Categories" />}>
      <Space direction="vertical">
        {categories.map((category) => (
          <CardButton
            href={`/category/${category}`}
            key={category}
            size="large"
            nav={true}
          >
            {category}
          </CardButton>
        ))}
      </Space>
    </Card>
  );
}
