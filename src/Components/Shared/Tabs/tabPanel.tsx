type TTabPanel = {
  index: number;
  value: number;
  children: React.ReactNode;
};

const TabPanel = ({ index, value, children }: TTabPanel) => {
  return value === index ? children : <></>;
};

export default TabPanel;
