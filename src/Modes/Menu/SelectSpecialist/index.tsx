import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import SpecialistServices from "./SpecialistServices";
import SpecialistWorkers from "./SpecialistWorkers";
import Contacts from "@/Components/Containers/Contacts";

type TSelectSpecialist = {
  step: number;
  onStepChange(): void;
};

const SelectSpecialist = ({ step, onStepChange }: TSelectSpecialist) => {
  return (
    <>
      <TabPanel index={1} value={step}>
        <SpecialistWorkers onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={2} value={step}>
        <SpecialistServices onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={3} value={step}>
        <Contacts />
      </TabPanel>
    </>
  );
};

export default SelectSpecialist;
