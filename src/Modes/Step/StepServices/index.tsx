import Services from "@/Components/Containers/Services";
import { StepServicesVM } from "./StepServicesVM";

type TStepServices = {
  onSubmit?(): void;
};

const StepServices = ({ onSubmit }: TStepServices) => {
  const {
    abbreviation,
    handleServiceChange,
    loading,
    selectedServices,
    services,
  } = StepServicesVM();

  return (
    <Services
      services={services}
      selectedServices={selectedServices}
      onSelect={handleServiceChange}
      loading={loading}
      abbreviation={abbreviation}
      classes={{
        sticky: "!top-0 pt-5",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default StepServices;
