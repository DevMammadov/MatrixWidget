import TabPanel from '@/Components/Shared/Tabs/tabPanel';
import Contacts from '@/Components/Containers/Contacts';
import ServiceWorkers from './ServiceWorkers';
import ServiceServices from './ServiceServices';
import ServiceTime from './ServiceTime';

type TSelectSpecialist = {
  step: number;
  onStepChange(step?: number): void;
};

const SelectSpecialist = ({ step, onStepChange }: TSelectSpecialist) => {
  return (
    <>
      <TabPanel index={0} value={step}>
        <ServiceServices onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={1} value={step}>
        <ServiceWorkers onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={2} value={step}>
        <ServiceTime onSubmit={onStepChange} />
      </TabPanel>
      <TabPanel index={3} value={step}>
        <Contacts />
      </TabPanel>
    </>
  );
};

export default SelectSpecialist;
