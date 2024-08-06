import Services from '@/Components/Containers/Services';
import { StepServicesVM } from './StepServicesVM';

const StepServices = () => {
  const {
    addService,
    filteredServices,
    isSelected,
    selectedFilial,
    selectedServices,
    loading,
    setInputValue,
  } = StepServicesVM();

  return (
    <Services
      isSelected={isSelected}
      loading={loading}
      abbreviation={selectedFilial.abbreviation}
      addService={addService}
      services={filteredServices}
      onInputChange={setInputValue}
      selectedServices={selectedServices}
    />
  );
};

export default StepServices;
