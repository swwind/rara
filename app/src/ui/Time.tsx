type Props = {
  time: Date | string;
};

export default function Time({ time }: Props) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return (
    <time dateTime={`${year}-${month}-${day}`}>
      🕒 {`${year}/${month}/${day}`}
    </time>
  );
}
