import Tabs from "@/Components/Shared/Tabs";
import { useSteps } from "@/Data/pageData";
import Filials from "@/Steps/Filials";

const Step = () => {
  const steps = useSteps();

  return (
    <div>
      <Tabs tabs={steps} />
      <div>
        <Filials />
      </div>
    </div>
  );
};

export default Step;
