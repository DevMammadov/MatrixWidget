import Dropdown from "@/Components/Shared/Dropdown";
import { FilialsVM } from "@/Steps/Filials/FilialsVM";
import { TFilial } from "@/Steps/Filials/TFilials";
import { MenuStepVM } from "@/Steps/MenuStep/MenuStepVM";

type TMenuStep = {
  onSubmit(index: number): void;
};

const MenuStep = ({ onSubmit }: TMenuStep) => {
  const { filials, selectedFilial, setStore } = FilialsVM();
  const { menu } = MenuStepVM();

  return (
    <div className="px-4 pt-8">
      <div>
        <Dropdown
          data={filials}
          optionLabel={(t) => t.name}
          optionValue={(t) => t}
          className="max-w-[45%]"
          value={selectedFilial}
          onChange={(item: TFilial) => {
            setStore({
              filial: {
                selectedFilial: item,
              },
            });
          }}
        />
        <span className="text-xl text-gray-500 pl-2">
          {selectedFilial.address}
        </span>
      </div>
      <div className="flex flex-col gap-3 pt-8 pr-2">
        {menu.map((m) => (
          <button
            className="flex justify-between items-center group hover:bg-gray-900 hover:text-white rounded-md p-1 cursor-pointer focus:outline-none"
            onClick={() => onSubmit(m.index)}
            key={m.index}
          >
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center w-[48px] h-[48px] bg-cyan-100 group-hover:bg-primary rounded-full text-5xl">
                <i className={m.icon} />
              </div>
              <span>{m.label}</span>
            </div>
            <span>
              <i className="ph-light ph-caret-right" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuStep;
