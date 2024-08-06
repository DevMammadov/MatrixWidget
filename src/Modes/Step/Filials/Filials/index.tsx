import UserSelectItem from "@/Components/Shared/UserSelectTem";
import { FilialsVM } from "@/Steps/Filials/FilialsVM";

const Filials = () => {
  const { filials, setStore, selectedFilial } = FilialsVM();

  return (
    <form className="flex flex-col gap-5 px-3">
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
    </form>
  );
};

export default Filials;
