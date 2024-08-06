import TabPanel from '@/Components/Shared/Tabs/tabPanel';
import { useI18 } from '@/i18next';
import { MenuVM } from '@/Modes/Menu/MenuVM';
import MainPage from './MainPage';
import SelectSpecialist from './SelectSpecialist';
import SelectService from './SelectService';

const Menu = () => {
  const {
    isSuccess,
    step,
    handleNavigate,
    mainStep,
    setMainStep,
    handleStepChange,
  } = MenuVM();
  const t = useI18();

  return (
    <div className="h-full">
      <TabPanel index={-1} value={step}>
        <MainPage onSubmit={handleNavigate} />
      </TabPanel>
      <TabPanel index={0} value={mainStep}>
        <SelectSpecialist onStepChange={handleStepChange} step={step} />
      </TabPanel>
      <TabPanel index={1} value={mainStep}>
        <SelectService onStepChange={handleStepChange} step={step} />
      </TabPanel>
    </div>
  );
};

export default Menu;
