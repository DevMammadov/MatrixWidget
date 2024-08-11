import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import Contacts from "@/Components/Containers/Contacts";
import DateWorkers from "./DateWorkers";
import DateTime from "./DateTime";
import DateServices from "./DateServices";

type TSelectDate = {
  step: number;
  onStepChange(step?: number): void;
};

const SelectDate = ({ step, onStepChange }: TSelectDate) => {
  return (
    <>
      <TabPanel index={1} value={step}>
        <DateTime onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={2} value={step}>
        <DateWorkers onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={3} value={step}>
        <DateServices onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={4} value={step}>
        <Contacts />
      </TabPanel>
    </>
  );
};

export default SelectDate;
