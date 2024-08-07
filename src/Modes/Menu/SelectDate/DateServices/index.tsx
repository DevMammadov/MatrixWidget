import Services from "@/Components/Containers/Services";
import { DateServicesVM } from "./DateServicesVM";
import { useI18 } from "@/i18next";

type TSpecialistServices = {
  onSubmit(): void;
};

const DateServices = ({ onSubmit }: TSpecialistServices) => {
  const {
    services,
    loading,
    handleServiceChange,
    selectedServices,
    abbreviation,
  } = DateServicesVM();
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

export default DateServices;
