import { getFilials } from "@/Api";
import { TFilial } from "@/Steps/Filials/TFilials";
import { useStore } from "@/Store";

export const FilialsVM = () => {
  const { setStore } = useStore();
  const [filials, setFilials] = React.useState<TFilial[]>([]);

  React.useEffect(() => {
    getFilials().then(({ data }) => {
      setFilials(data);
    });
  }, []);

  return { filials, setStore };
};
