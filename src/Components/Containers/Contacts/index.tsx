import UserSelectItem from "@/Components/Shared/UserSelectTem";
import { clsx } from "@/Helpers/clsx";
import { useI18 } from "@/i18next";
import ContactForm from "@/Steps/Contacts/Contactform";
import { ContactsVM } from "@/Steps/Contacts/ContactsVM";

type TContacts = {
  className?: string;
};

const Contacts = ({ className }: TContacts) => {
  const t = useI18();
  const {
    selectedWorker,
    selectedTime,
    selectedDate,
    endTime,
    durations,
    selectedServices,
    selectedFilial,
    totalPrice,
    handleSubmit,
    loading,
    hasConfirmCode,
    codeError,
  } = ContactsVM();

  return (
    <div className={clsx("px-4", className)}>
      <h1 className="font-bold text-5xl mb-5">{t("detailsOfRecord")}</h1>
      <div className="flex flex-col gap-3 border-b pb-5">
        <UserSelectItem
          title={selectedWorker.name}
          text={selectedWorker.position}
          img={selectedWorker.photoUrl}
          selectable={false}
        />
        <UserSelectItem
          title={selectedDate}
          text={`${selectedTime} ${endTime}`}
          selectable={false}
          phosphorIcon="ph ph-calendar"
          swap
        />
      </div>
      <h1 className="font-bold text-5xl my-5 w-full">
        {t("services")}
        <span className="ml-2 text-base font-normal text-gray-500">
          {durations} {t("min")}
        </span>
      </h1>
      <div className="flex flex-col gap-4 border-b pb-5">
        {selectedServices.map((service) => (
          <div className="flex justify-between" key={service.serviceId}>
            <div className="flex flex-col gap-1">
              <span>{service.name}</span>
              <span className="text-xl leading-3 text-gray-600">
                {service.duration} {t("min")}
              </span>
            </div>
            <div className="whitespace-nowrap text-2xl">
              {service.price} {selectedFilial.abbreviation}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between">
          <span className="text-xl">{t("total")}</span>
          <span className="text-xl">
            {totalPrice} {selectedFilial.abbreviation}
          </span>
        </div>
      </div>
      <div className="py-4">
        <ContactForm
          onSubmit={handleSubmit}
          loading={loading}
          hasConfirmCode={hasConfirmCode}
          codeError={codeError}
        />
      </div>
    </div>
  );
};

export default Contacts;
