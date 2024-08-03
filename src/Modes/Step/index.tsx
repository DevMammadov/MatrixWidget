import Tabs from "@/Components/Shared/Tabs";
import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import { useSteps } from "@/Data/pageData";
import { StepVM } from "@/Modes/Step/StepVM";
import Contacts from "@/Steps/Contacts";
import Filials from "@/Steps/Filials";
import Services from "@/Steps/Services";
import SuccessPage from "@/Steps/Success";
import Time from "@/Steps/Time";
import Workers from "@/Steps/Workers";

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
        <Workers onSubmit={() => handleStepChange(2)} />
      </TabPanel>
      <TabPanel index={2} value={step}>
        <Time onSubmit={() => handleStepChange(3)} />
      </TabPanel>
      <TabPanel index={3} value={step}>
        <Contacts />
      </TabPanel>
    </div>
  );
};

export default Step;
