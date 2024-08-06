import { TService } from './TServices';

export const ServicesVM = (
  selectedServices: TService[],
  services: TService[],
  onSelect: (services: TService[], service?: TService) => void
) => {
  const [error, setError] = React.useState(false);
  const [text, setText] = React.useState('');

  const isSelected = (service: TService) => {
    return !!selectedServices.find((s) => s.serviceId === service.serviceId);
  };

  const filteredServices = React.useMemo(() => {
    return services.filter((s) =>
      s.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }, [services, text]);

  const getTotals = () => {
    return selectedServices.reduce(
      (acc, el) => {
        let count = 0;
        acc.count += ++count;
        acc.price += el.price;
        acc.duration += el.duration;
        return acc;
      },
      {
        count: 0,
        price: 0,
        duration: 0,
      }
    );
  };

  const addService = (service: TService) => {
    setError(false);

    const foundService = selectedServices.find(
      (s) => s.serviceId === service.serviceId
    );

    if (foundService) {
      onSelect(
        selectedServices?.filter((s) => s.serviceId !== service.serviceId),
        foundService
      );
    } else {
      onSelect([...selectedServices, service]);
    }
  };

  return {
    ...getTotals(),
    error,
    setError,
    text,
    setText,
    filteredServices,
    isSelected,
    addService,
  };
};
