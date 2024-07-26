import UserSelectItem from "@/Components/Shared/UserSelectTem";
import { FilialsVM } from "@/Steps/Filials/FilialsVM";

const Filials = () => {
  const { filials, setStore } = FilialsVM();
  const [val, setVal] = React.useState<string>();

  return (
    <form className="flex flex-col gap-5">
      {filials?.map((filial) => (
        <UserSelectItem
          key={filial.id}
          title={filial.name}
          text={filial.address}
          onChange={() => {
            setVal(filial.id);
            setStore({ selectedFilial: filial });
          }}
          checked={val === filial.id}
        />
      ))}
    </form>
  );
};

export default Filials;
