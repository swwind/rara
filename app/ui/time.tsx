type Props = {
  time: Date;
};

export default function Time({ time }: Props) {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDay();

  return (
    <time dateTime={`${year}-${month}-${day}`}>
      {`${year}/${month}/${day}`}
    </time>
  );
}
