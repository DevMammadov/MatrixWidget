import Checkbox from "@/Components/Shared/Checkbox";
import TextField from "@/Components/Shared/TextField";
import { ServicesVM } from "@/Steps/Services/ServicesVM";
import { useI18 } from "@/i18next";

const Services = () => {
  const { services } = ServicesVM();
  const t = useI18();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div>
        <h2 className="mb-6 text-5xl font-bold">{t("chooseService")}</h2>
        <TextField
          phosphorIcon="ph ph-magnifying-glass"
          placeholder={t("search")}
        />
      </div>
      <div className="mt-[22px] overflow-y-auto flex-1 bg-red-500">
        {/* {services?.map((service) => (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold">{service.name}</h1>
              <span className="text-lg text-gray-500">30 мин</span>
              <span>
                {service.price} ${t("rub")}
              </span>
            </div>
            <Checkbox />
          </div>
        ))} */}

        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  );
};

export default Services;
