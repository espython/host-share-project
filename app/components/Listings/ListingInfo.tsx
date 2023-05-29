'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";

import Avatar from "../navbar/Avatar";
import ListingCategory from "./ListingCategory";




interface ListingInfoProps {
  user: any
  description: string;
  details: any[]
  category?: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  locationValue,
  details
}) => {

  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng

  console.log("coordinates", locationValue)
  return (
    <div className="col-span-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user.avatar.url} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >{details?.map(item => (
          <div key={item.type}>
            {item.value} {item.type}
          </div>))}
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />

    </div>
  );
}

export default ListingInfo;