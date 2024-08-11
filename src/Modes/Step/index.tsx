import Tabs from "@/Components/Shared/Tabs";
import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import { useSteps } from "@/Data/pageData";
import { StepVM } from "@/Modes/Step/StepVM";
import Filials from "./Filials";
import StepWorkers from "./StepWorkers";
import StepTime from "./StepTime";
import Contacts from "@/Components/Containers/Contacts";
import StepServices from "./StepServices";
import SuccessPage from "@/Components/Containers/Success";

const Step = () => {
  const {
    isSuccess,
    isError,
    step,
    handleStepChange,
    handleTabChange,
    handleSuccess,
  } = StepVM();
  const steps = useSteps();

  if (isSuccess || isError) {
    return (
      <SuccessPage
        mode={isSuccess ? "success" : "error"}
        onChange={handleSuccess}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="sticky w-full top-0 py-3 bg-white z-50">
        <Tabs tabs={steps} active={step} onChange={handleTabChange} />
      </div>
      <div className="h-full overflow-y-scroll slim-scroll">
        <TabPanel index={0} value={step}>
          <Filials onSubmit={() => handleStepChange(1)} />
        </TabPanel>
        <TabPanel index={1} value={step}>
          <StepWorkers onSubmit={() => handleStepChange(2)} />
        </TabPanel>
        <TabPanel index={2} value={step}>
          <StepServices onSubmit={() => handleStepChange(3)} />
        </TabPanel>
        <TabPanel index={3} value={step}>
          <StepTime onSubmit={() => handleStepChange(4)} />
        </TabPanel>
        <TabPanel index={4} value={step}>
          <Contacts />
        </TabPanel>
      </div>
    </div>
  );
};

export default Step;
