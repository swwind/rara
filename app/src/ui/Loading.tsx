export default function Loading() {
  const array = [...new Array(5).keys()];

  return (
    <div className="rara-loading">
      {array.map((value) => (
        <span
          key={value}
          className="rara-loading-circle"
          style={{
            animationDelay: `.${value}s`,
          }}
        />
      ))}
    </div>
  );
}
