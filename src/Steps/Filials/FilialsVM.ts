import { getFilials } from "@/Api";

export const FilialsVM = () => {
  const [filials, setFilials] = React.useState<any>(null);

  React.useEffect(() => {
    getFilials().then((data) => {
      setFilials(data);
    });
  }, []);

  return { filials };
};
