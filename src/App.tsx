import Layout from "@/Layout";
import Menu from "@/Modes/Menu";
import Step from "@/Modes/Step";
import Inline from "@/Modes/Inline";
import { config } from "@/config";
import { ESteps } from "@/Data/enum";
import { initI18n } from "@/i18next";
import { AppProvider } from "@/Store";

function App() {
  const { useEffect } = React;

  useEffect(() => {
    initI18n();
  }, []);

  const renderMode = () => {
    switch (config.isStep) {
      case ESteps.menu:
        return <Menu />;
      case ESteps.inline:
        return <Inline />;
      default:
        return <Step />;
    }
  };

  return (
    <AppProvider>
      <Layout>
        <div className="relative h-full mt-3 p-5">{renderMode()}</div>
      </Layout>
    </AppProvider>
  );
}

export default App;
