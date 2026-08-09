import EncodeDecodePanel from "./components/EncodeDecodePanel";
import DateConverterPanel from "./components/DateConverterPanel";

export const TABS = [
  {
    id: "convert",
    label: "Encode / Decode",
    Panel: EncodeDecodePanel,
  },
  {
    id: "date",
    label: "Date Converter",
    Panel: DateConverterPanel,
  },
];

export const DEFAULT_TAB = TABS[0].id;

export const getTab = (id) => TABS.find((tab) => tab.id === id) ?? TABS[0];
