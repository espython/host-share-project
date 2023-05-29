'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";


import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: any;
  imageSrc: string;
  id: string;

}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,

}) => {
  const { getByValue } = useCountries();



  return (
    <>
      <Heading
        title={title}
        subtitle={`${locationValue.country.title}, ${locationValue?.city}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton
            listingId={id}
          />
        </div>
      </div>
    </>
  );
}

export default ListingHead;