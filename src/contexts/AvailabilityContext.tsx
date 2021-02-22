import React, { createContext, useCallback, useState } from "react";

export interface AvailabilityData {
  id: string;
  DATAPAYLOAD: string;
}
export interface AvailabilityType {
  manufacturer: string;
  data: AvailabilityData[];
}
interface AvailabilityContextType {
  availData: AvailabilityType[];
  updateManuData: (data: AvailabilityData[], manufacturer: string) => void;
}

export const AvailabilityContext = createContext<AvailabilityContextType>({
  availData: [],
  updateManuData: (data: AvailabilityData[], manufacturer: string) => {},
});

const AvailabilityComponent = (props: { children: JSX.Element }) => {
  const [availabilitiesData, setAvailabilitiesData] = useState<
    AvailabilityType[]
  >([]);

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
