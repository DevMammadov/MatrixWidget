import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import { EMenuNavigate, EMenuSteps, ESteps } from "@/Data/enum";
import { useI18 } from "@/i18next";
import { MenuVM } from "@/Modes/Menu/MenuVM";
import Contacts from "@/Steps/Contacts";
import GeneralTime from "@/Steps/GeneralTime";
import MenuStep from "@/Steps/MenuStep";
import Services from "@/Steps/Services";
import Time from "@/Steps/Time";
import WorkerWithTime from "@/Steps/WorkersWithTime";

const Menu = () => {
  const { handleStepChange, isSuccess, step, handleNavigate, mainStep } =
    MenuVM();
  const t = useI18();

  return (
    <div className="h-full">
      <TabPanel index={EMenuSteps.MenuStep} value={step}>
        <MenuStep onSubmit={handleNavigate} />
      </TabPanel>
      <TabPanel index={EMenuSteps.WorkerWithTime} value={step}>
        <WorkerWithTime
          selectedDateSlots={[EMenuNavigate.ChooseDateTime].includes(mainStep!)}
          skipDate={[
            EMenuNavigate.ChooseEmployee,
            EMenuNavigate.ChooseServices,
          ].includes(mainStep!)}
          skipService={[
            EMenuNavigate.ChooseEmployee,
            EMenuNavigate.ChooseDateTime,
          ].includes(mainStep!)}
          onSubmit={(isReady) => {
            if (mainStep === EMenuNavigate.ChooseServices) {
              handleStepChange(
                !isReady ? EMenuSteps.WorkerWithTime : EMenuSteps.Time
              );
            } else {
              handleStepChange(EMenuSteps.WorkerWithTime);
            }
          }}
          buttonTitle={
            [
              EMenuNavigate.ChooseEmployee,
              EMenuNavigate.ChooseDateTime,
            ].includes(mainStep!)
              ? t("chooseService")
              : undefined
          }
        />
      </TabPanel>
      <TabPanel index={EMenuSteps.Services} value={step}>
        <Services
          classes={{ sticky: "top-[0px] pt-8" }}
          onSubmit={() => handleStepChange(EMenuSteps.Services)}
          buttonTitle={
            [EMenuNavigate.ChooseDateTime].includes(mainStep!)
              ? t("ready")
              : undefined
          }
        />
      </TabPanel>
      <TabPanel index={EMenuSteps.Time} value={step}>
        <Time onSubmit={() => handleStepChange(EMenuSteps.Time)} />
      </TabPanel>
      <TabPanel index={EMenuSteps.GeneralTime} value={step}>
        <GeneralTime
          onSubmit={() => handleStepChange(EMenuSteps.GeneralTime)}
        />
      </TabPanel>
      <TabPanel index={EMenuSteps.Contacts} value={step}>
        <Contacts className="pt-7" />
      </TabPanel>
    </div>
  );
};

export default Menu;
