import { createContext, useContext, useState } from "react";
import { ItemsContext } from "./ItemsContext";
import axios from "../utils/apiCaller";

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
  fetchAvailability: (manufacturer: string) => Promise<any>;
  updateManuData: (manufacturer: string, availData: AvailabilityData[]) => void;
}

export const AvailabilityContext = createContext<AvailabilityWithFetch>({
  availData: [],
  fetchAvailability: (manufacturer: string) => Promise.all([]),
  updateManuData: (manufacturer: string, availData: AvailabilityData[]) => {},
});

const fetchAvailability = async (manufacturer: string) => {
  console.log("FETCHING AVAIL");
  try {
    const response = await axios.get(`/availability/${manufacturer}`);
    return response.data.response;
  } catch (e: unknown) {
    return [];
  }
};

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

  const updateManuData = (
    manufacturer: string,
    availData: AvailabilityData[]
  ) => {
    setAvailabilitiesData((prevData) => [
      ...prevData,
      { manufacturer: manufacturer, data: availData },
    ]);
  };

  return (
    <AvailabilityContext.Provider
      value={{
        availData: availabilitiesData,
        fetchAvailability,
        updateManuData,
      }}
    >
      {props.children}
    </AvailabilityContext.Provider>
  );
};

export default AvailabilityComponent;
