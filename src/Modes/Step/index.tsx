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
import { EStepMode } from "@/Data/enum";

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
      <div className="sticky w-full top-0 py-3 mt-1 bg-white z-50">
        <Tabs tabs={steps} active={step} onChange={handleTabChange} />
      </div>
      <div className="h-full overflow-y-scroll slim-scroll">
        <TabPanel index={EStepMode.filial} value={step}>
          <Filials onSubmit={() => handleStepChange(EStepMode.worker)} />
        </TabPanel>
        <TabPanel index={EStepMode.worker} value={step}>
          <StepWorkers onSubmit={() => handleStepChange(EStepMode.service)} />
        </TabPanel>
        <TabPanel index={EStepMode.service} value={step}>
          <StepServices onSubmit={() => handleStepChange(EStepMode.time)} />
        </TabPanel>
        <TabPanel index={EStepMode.time} value={step}>
          <StepTime onSubmit={() => handleStepChange(EStepMode.contacts)} />
        </TabPanel>
        <TabPanel index={EStepMode.contacts} value={step}>
          <Contacts />
        </TabPanel>
      </div>
    </div>
  );
};

export default Step;
