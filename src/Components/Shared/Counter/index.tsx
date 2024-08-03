type TCounter = {
  count?: number;
  children: React.ReactElement;
};

const Counter = ({ count = 1, children }: TCounter) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => React.cloneElement(children, { key: i }))}
    </>
  );
};

export default Counter;
