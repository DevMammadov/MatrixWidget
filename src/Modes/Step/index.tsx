import Tabs from '@/Components/Shared/Tabs';
import TabPanel from '@/Components/Shared/Tabs/tabPanel';
import { useSteps } from '@/Data/pageData';
import { StepVM } from '@/Modes/Step/StepVM';
import Services from '@/Steps/Services';
import SuccessPage from '@/Steps/Success';
import Filials from './Filials/Filials';
import StepWorkers from './StepWorkers';
import StepTime from './StepTime';
import Contacts from '@/Components/Containers/Contacts';

const Step = () => {
  const { isSuccess, step, handleStepChange, handleTabChange, handleSuccess } =
    StepVM();
  const steps = useSteps();

  if (isSuccess) {
    return <SuccessPage onChange={handleSuccess} />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="sticky w-full top-0 py-8 bg-white z-10">
        <Tabs tabs={steps} active={step} onChange={handleTabChange} />
      </div>
      <TabPanel index={-1} value={step}>
        <Filials />
      </TabPanel>
      <TabPanel index={0} value={step}>
        <Services onSubmit={() => handleStepChange(1)} />
      </TabPanel>
      <TabPanel index={1} value={step}>
        <StepWorkers onSubmit={() => handleStepChange(2)} />
      </TabPanel>
      <TabPanel index={2} value={step}>
        <StepTime onSubmit={() => handleStepChange(3)} />
      </TabPanel>
      <TabPanel index={3} value={step}>
        <Contacts />
      </TabPanel>
    </div>
  );
};

export default Step;
