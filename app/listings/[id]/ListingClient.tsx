'use client';

import axios from "axios";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import Container from "@/app/components/container";
import { dataPromise } from "@/app/components/navbar/Categories";

import { DataEntity } from "@/app/types/listings";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingReservation from "@/app/components/Listings/ListingReservation";
import ClientOnly from "@/app/components/ClientOnly";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: DataEntity

}

const ListingClient: React.FC<ListingClientProps> = ({
  listing

}) => {

  const router = useRouter();
  const data = use(dataPromise)


  const category = useMemo(() => {
    return data?.categories?.find((items) =>
      items.title === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.info.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);



  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.info.price) {
        setTotalPrice(dayCount * listing.info.price);
      } else {
        setTotalPrice(listing.info.price);
      }
    }
  }, [dateRange, listing.info.price]);

  return (
    <ClientOnly>

      <Container>
        <div
          className="
        max-w-screen-lg 
        mx-auto
        "
        >
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.info.title}
              imageSrc={listing.info.mainImage.url}
              locationValue={listing.info.location}
              id={listing.info.id}
            />
            <div
              className="
            grid 
            grid-cols-1 
            md:grid-cols-7 
            md:gap-10 
            mt-6
            "
            >
              <ListingInfo
                description={listing.info.description}
                roomCount={listing.info.amenities.count}
                guestCount={listing.info.details.count}
                bathroomCount={listing.info.details.count}
                locationValue={listing.info.location.address}
                user={listing.info.host}
              />

            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}

export default ListingClient;
