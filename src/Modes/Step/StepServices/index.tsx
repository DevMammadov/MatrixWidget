import Services from "@/Components/Containers/Services";
import { StepServicesVM } from "./StepServicesVM";
import { useI18 } from "@/i18next";

type TStepServices = {
  onSubmit?(): void;
};

const StepServices = ({ onSubmit }: TStepServices) => {
  const {
    services,
    loading,
    handleServiceChange,
    selectedServices,
    abbreviation,
  } = StepServicesVM();
  const t = useI18();

  return (
    <Services
      services={services}
      loading={loading}
      onSelect={handleServiceChange}
      onSubmit={onSubmit}
      buttonTitle={t("ready")}
      selectedServices={selectedServices}
      abbreviation={abbreviation}
      classes={{
        sticky: "!top-0 pt-5",
      }}
    />
  );
};

export default StepServices;
