import axios from "../utils/apiCaller";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { ITEM_PER_PAGE } from "../constants";
import {
  AvailabilityContext,
  AvailabilityData,
} from "../contexts/AvailabilityContext";
import ClothesItem, { ItemWithAvailability } from "./ClothesItem";
import { Item } from "./ClothesItems";
import SkeletonCard from "./SkeletonCard";

interface PageParams {
  page: string;
}
export interface DisplayedItemsProps extends RouteComponentProps<PageParams> {
  items: Item[];
  itemParam: string;
}
interface AvailabilityReponse {
  code: number;
  response: AvailabilityData[] | string;
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

      for (const manu of uniqueManufacturers) {
        let response: AvailabilityData[] = [];
        try {
          const result = (
            await axios.get<AvailabilityReponse>(`/availability/${manu}`)
          ).data.response;
          if (typeof result === "string") {
            response = [];
          } else {
            response = result;
          }
        } catch (e: unknown) {
          response = [];
        }
        updateManuDataRef.current(response, manu);
      }
      setIsManuloaded(true);
    };
    fetchManu();
  }, [displayedItems]);
  if (
    +props.match.params.page > Math.ceil(props.items.length / ITEM_PER_PAGE)
  ) {
    return <Redirect to={`/${props.itemParam}`} />;
  }
  if (availDataRef.current !== availData) {
    availDataRef.current = availData;
  }

  if (!isManuloaded) {
    const skeleton = [...Array(ITEM_PER_PAGE).keys()].map((item) => (
      <SkeletonCard key={item} />
    ));
    return (
      <div className="grid grid-cols-1 gap-3 px-4 pt-16 pb-4 mt-4 sm:pl-56 sm:pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {skeleton}
      </div>
    );
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
