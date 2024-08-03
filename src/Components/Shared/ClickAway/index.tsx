interface ClickAwayListenerProps {
  children: React.ReactNode;
  onClickAway: () => void;
}

const ClickAway: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={ref}>{children}</div>;
};

export default ClickAway;
