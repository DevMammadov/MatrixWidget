import UserSelectItem from "@/Components/Shared/UserSelectTem";
import { FilialsVM } from "./FilialsVM";
import Button from "@/Components/Shared/Button";
import { useI18 } from "@/i18next";

type TFilials = {
  onSubmit(): void;
};

const Filials = ({ onSubmit }: TFilials) => {
  const { filials, setStore, selectedFilial } = FilialsVM();
  const t = useI18();

  return (
    <div className="flex flex-col gap-5 px-3 h-full">
      {filials?.map((filial) => (
        <UserSelectItem
          key={filial.id}
          title={filial.name}
          text={filial.address}
          img={filial.photoUrl}
          onChange={() => {
            setStore({ filial: { selectedFilial: filial } });
          }}
          checked={selectedFilial.id === filial.id}
        />
      ))}
      <Button
        onClick={onSubmit}
        className="absolute w-[95%] z-20 bottom-[60px] bg-white shadow-2xl focus:outline-none"
      >
        {t("chooseService")}
      </Button>
    </div>
  );
};

export default Filials;
