'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useCallback, useMemo } from "react";
import { HiStar } from "react-icons/hi"

import useCountries from "@/app/hooks/useCountries";
import {
  DataEntity,
  SafeListing,
  SafeReservation,

} from "../../types/listings";

import HeartButton from "../HeartButton";
import Button from "../button";
import { dataPromise } from "../navbar/Categories";


interface ListingCardProps {
  data: DataEntity;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;

};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',

}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const cats = use(dataPromise)

  const location = getByValue(data.info.location.city);
  const category = useMemo(() => { return cats?.categories?.find(item => item.id === data.category) }, [data.category])

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {

    return data.info.price;
  }, [reservation, data.info.price]);


  return (
    <div
      onClick={() => router.push(`/listings/${data.info.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.info.mainImage.url}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton
              listingId={data.info.id}
            />
          </div>
        </div>
        <div className="font-semibold text-lg flex justify-between">
          <div>{location?.region}, {location?.label}</div>
          <div className="flex flex-row items-center font-normal text-base"><HiStar />{data.info.ratings.value}</div>
        </div>
        <div className="font-light text-neutral-500">
          {category?.title || "Amazing house"}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;