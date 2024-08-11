import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import { MenuVM } from "@/Modes/Menu/MenuVM";
import MainPage from "./MainPage";
import SelectSpecialist from "./SelectSpecialist";
import SelectService from "./SelectService";
import SelectDate from "./SelectDate";
import SuccessPage from "@/Components/Containers/Success";

const Menu = () => {
  const {
    isSuccess,
    step,
    handleNavigate,
    mainStep,
    handleSuccess,
    handleStepChange,
    isError,
  } = MenuVM();

  if (isSuccess || isError) {
    return (
      <SuccessPage
        mode={isSuccess ? "success" : "error"}
        onChange={handleSuccess}
      />
    );
  }

  return (
    <div className="h-full">
      <TabPanel index={0} value={step}>
        <MainPage onSubmit={handleNavigate} />
      </TabPanel>
      <TabPanel index={1} value={mainStep}>
        <SelectSpecialist onStepChange={handleStepChange} step={step} />
      </TabPanel>
      <TabPanel index={2} value={mainStep}>
        <SelectService onStepChange={handleStepChange} step={step} />
      </TabPanel>
      <TabPanel index={3} value={mainStep}>
        <SelectDate onStepChange={handleStepChange} step={step} />
      </TabPanel>
    </div>
  );
};

export default Menu;
