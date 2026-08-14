import EncodeDecodePanel from "./components/EncodeDecodePanel";
import DateConverterPanel from "./components/DateConverterPanel";
import ImageGeneratorPanel from "./components/ImageGeneratorPanel";

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
  {
    id: "image",
    label: "Image Generator",
    Panel: ImageGeneratorPanel,
    hideCopyClear: true,
  },
];

export const DEFAULT_TAB = TABS[0].id;

export const getTab = (id) => TABS.find((tab) => tab.id === id) ?? TABS[0];
