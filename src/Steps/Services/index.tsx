import Button from "@/Components/Shared/Button";
import Checkbox from "@/Components/Shared/Checkbox";
import TextField from "@/Components/Shared/TextField";
import ServiceSkeleton from "@/Components/Skeletons/ServiceSkeleton";
import { clsx } from "@/Helpers/clsx";
import { ServicesVM } from "@/Steps/Services/ServicesVM";
import { useI18 } from "@/i18next";

type TServices = {
  onSubmit?(): void;
  buttonTitle?: string;
  classes?: {
    sticky?: string;
  };
};

const Services = ({ onSubmit, classes, buttonTitle }: TServices) => {
  const {
    filteredServices,
    servicesLoading,
    isSelected,
    addService,
    count,
    duration,
    price,
    setText,
    text,
    selectedServices,
    error,
    setError,
    selectedFilial,
  } = ServicesVM();
  const t = useI18();

  return (
    <div className="flex flex-col h-full relative">
      <div
        className={clsx(
          "sticky top-[105px] bg-white pb-3 px-3 z-10",
          classes?.sticky
        )}
      >
        <h2 className="mb-6 text-5xl font-bold">{t("chooseService")}</h2>
        <TextField
          phosphorIcon="ph ph-magnifying-glass"
          placeholder={t("search")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClear={() => setText("")}
          classes={{
            field: "rounded-huge",
          }}
        />
      </div>
      <div className="flex-grow px-3 mt-2">
        {!servicesLoading &&
          filteredServices?.map((service, i) => (
            <div
              className="flex items-center justify-between mb-2"
              key={`${service.name}${i}`}
            >
              <div className="flex flex-col">
                <h1 className="font-bold">{service.name}</h1>
                <span className="text-lg text-gray-500">
                  {service.duration} {t("min")}
                </span>
                <span>
                  {service.price} {selectedFilial.abbreviation}
                </span>
              </div>
              <Checkbox
                onChange={() => addService(service)}
                checked={isSelected(service)}
              />
            </div>
          ))}

        {servicesLoading && <ServiceSkeleton count={10} />}
      </div>
      <div className="sticky z-20 bottom-[60px] left-0 p-5 bg-white shadow-2xl w-full">
        <div className="flex justify-between items-end">
          <div className="flex gap-2 items-end">
            <span>
              {count} {t("service")}
            </span>
            <span className="text-sm text-gray-500">
              {duration} {t("min")}
            </span>
          </div>
          <div>
            {price} {selectedFilial.abbreviation}
          </div>
        </div>
        <Button
          className="mt-5"
          onClick={() => {
            selectedServices.length > 0 ? onSubmit?.() : setError(true);
          }}
        >
          {buttonTitle || t("chooseWorker")}
        </Button>
        <div
          className={clsx(
            "text-red-500 visible flex justify-center text-lg",
            !error && "invisible"
          )}
        >
          {t("serviceNotSelected")}
        </div>
      </div>
    </div>
  );
};

export default Services;
