import { getFilialServices } from "@/Api";
import { TService } from "@/Steps/Services/TServices";
import { useStore } from "@/Store";

export const ServicesVM = () => {
  const [services, setServices] = React.useState<TService[]>();
  const { store } = useStore();

  //store.selectedFilial.id

  React.useEffect(() => {
    getFilialServices("7a0c5e20-309d-11eb-bbe0-0050568303be").then(
      ({ data }) => {
        setServices(data);
      }
    );
  }, []);

  return {
    services,
  };
};
