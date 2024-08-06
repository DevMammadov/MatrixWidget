import Services from '@/Components/Containers/Services';
import { ServiceServicesVM } from './ServiceServicesVM';

type TServiceServices = {
  onSubmit(): void;
};

const ServiceServices = ({ onSubmit }: TServiceServices) => {
  const {
    services,
    loading,
    handleServiceChange,
    selectedServices,
    abbreviation,
  } = ServiceServicesVM();

  return (
    <Services
      services={services}
      selectedServices={selectedServices}
      onSelect={handleServiceChange}
      loading={loading}
      abbreviation={abbreviation}
      classes={{
        sticky: '!top-0 pt-5',
      }}
      onSubmit={onSubmit}
    />
  );
};

export default ServiceServices;
