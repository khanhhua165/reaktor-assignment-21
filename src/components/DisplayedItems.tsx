import axios from "../utils/apiCaller";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ITEM_PER_PAGE } from "../constants";
import {
  AvailabilityContext,
  AvailabilityData,
} from "../contexts/AvailabilityContext";
import ClothesItem, { ItemWithAvailability } from "./ClothesItem";
import { Item } from "./ClothesItems";

interface PageParams {
  page: string;
}
export interface DisplayedItemsProps extends RouteComponentProps<PageParams> {
  items: Item[];
}

const DisplayedItems = (props: DisplayedItemsProps) => {
  const { availData, updateManuData } = useContext(AvailabilityContext);
  const availDataRef = useRef(availData);
  const updateManuDataRef = useRef(updateManuData);
  const [isManuloaded, setIsManuloaded] = useState(false);
  const displayedItems = useMemo(
    () =>
      props.items.slice(
        ITEM_PER_PAGE * (parseInt(props.match.params.page) - 1),
        ITEM_PER_PAGE * parseInt(props.match.params.page)
      ),
    [props.items, props.match.params.page]
  );

  if (availDataRef.current !== availData) {
    availDataRef.current = availData;
  }

  useEffect(() => {
    const fetchManu = async () => {
      setIsManuloaded(false);
      const uniqueManufacturers: string[] = [];
      for (const item of displayedItems) {
        if (
          !availDataRef.current.some(
            (data) => data.manufacturer === item.manufacturer
          )
        ) {
          if (!uniqueManufacturers.includes(item.manufacturer)) {
            uniqueManufacturers.push(item.manufacturer);
          }
        }
      }

      console.log(uniqueManufacturers.length);
      for (const manu of uniqueManufacturers) {
        let response: AvailabilityData[] = [];
        try {
          console.log("FETCHIG");
          const result = (await axios.get(`/availability/${manu}`)).data
            .response;
          console.log(manu);
          console.log(result);
          console.log(typeof result);
          if (typeof result === "string") {
            response = [];
          } else {
            response = result;
          }
        } catch (e: unknown) {
          console.log("Co loi rui");
          response = [];
        }
        updateManuDataRef.current(response, manu);
      }
      setIsManuloaded(true);
      console.log("hahaha");
    };
    fetchManu();
  }, [displayedItems]);
  console.log("mount");
  console.log(isManuloaded);
  if (!isManuloaded) {
    return null;
  }
  const displayItemsWithAvail: ItemWithAvailability[] = [];
  for (const item of displayedItems) {
    const manufacturerIndex = availData.findIndex(
      (data) => data.manufacturer === item.manufacturer
    );
    const itemIndex = availData[manufacturerIndex].data.findIndex(
      (data) => data.id === item.id.toUpperCase()
    );
    if (itemIndex === -1) {
      displayItemsWithAvail.push({
        ...item,
        availability: "NO INFO AVAILABLE",
      });
    } else {
      const itemAvailData =
        availData[manufacturerIndex].data[itemIndex].DATAPAYLOAD;
      const leftIndex = itemAvailData.indexOf("<INSTOCKVALUE>") + 14;
      const rightIndex = itemAvailData.indexOf("</INSTOCKVALUE>");
      displayItemsWithAvail.push({
        ...item,
        availability: itemAvailData.slice(leftIndex, rightIndex),
      });
    }
  }
  const result = displayItemsWithAvail.map((item: ItemWithAvailability) => (
    <ClothesItem key={item.id} {...item} />
  ));
  return (
    <div className="grid grid-cols-1 gap-3 px-4 pt-16 pb-4 mt-4 sm:pl-56 sm:pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {result}
    </div>
  );
};

export default DisplayedItems;
