import { createContext, useCallback, useContext, useState } from "react";
import { ItemsContext } from "./ItemsContext";

type ManufacturersType = string[];
export interface AvailabilityData {
  id: string;
  DATAPAYLOAD: string;
}
export interface AvailabilityType {
  manufacturer: string;
  data: AvailabilityData[];
}
interface AvailabilityWithFetch {
  availData: AvailabilityType[];
  updateManuData: (data: AvailabilityData[], manufacturer: string) => void;
}

export const AvailabilityContext = createContext<AvailabilityWithFetch>({
  availData: [],
  updateManuData: (data: AvailabilityData[], manufacturer: string) => {},
});

const AvailabilityComponent = (props: { children: JSX.Element }) => {
  const [manufacturersData, setManufacturersData] = useState<ManufacturersType>(
    []
  );
  const [availabilitiesData, setAvailabilitiesData] = useState<
    AvailabilityType[]
  >([]);
  const allItems = useContext(ItemsContext);
  for (const itemType in allItems) {
    allItems[itemType].forEach((item) => {
      if (!manufacturersData.includes(item.manufacturer)) {
        setManufacturersData((prevManufacturersData) => [
          ...prevManufacturersData,
          item.manufacturer,
        ]);
      }
    });
  }

  const updateManuData = useCallback(
    (data: AvailabilityData[], manufacturer: string) => {
      setAvailabilitiesData((prevData) => [
        ...prevData,
        { manufacturer, data },
      ]);
    },
    []
  );
  return (
    <AvailabilityContext.Provider
      value={{
        availData: availabilitiesData,
        updateManuData,
      }}
    >
      {props.children}
    </AvailabilityContext.Provider>
  );
};

export default AvailabilityComponent;
