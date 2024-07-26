import Tabs from "@/Components/Shared/Tabs";
import TabPanel from "@/Components/Shared/Tabs/tabPanel";
import { useSteps } from "@/Data/pageData";
import Filials from "@/Steps/Filials";
import Services from "@/Steps/Services";

const Step = () => {
  const steps = useSteps();
  const [tab, setTab] = React.useState(0);

  return (
    <div className="flex-1">
      <Tabs tabs={steps} className="mb-10" onChange={setTab} />
      <TabPanel index={-1} value={tab}>
        <Filials />
      </TabPanel>
      <TabPanel index={0} value={tab}>
        <Services />
      </TabPanel>
    </div>
  );
};

export default Step;
