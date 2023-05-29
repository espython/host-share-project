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
import { GiMountainRoad } from "react-icons/gi";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false
});

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
  const cats = use(dataPromise)

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

  const categoryData = useMemo(() => {
    if (!listing.category) {
      return { title: "Country Side" }
    }
    return cats?.categories?.find(item => item.id === listing.category)
  }, [listing.category])

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
              grid-cols-2
              md:grid-cols-10
              md:gap-8
              mt-6
            "
            >
              <ListingInfo
                category={{ icon: GiMountainRoad, label: categoryData?.title as string, description: "Amazing house with Great facilities" }}
                description={listing.info.description}
                details={listing.info.details.data}
                locationValue={listing.info.location.city}
                user={listing.info.host}
              />
              <div
                className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-4
              "
              >
                <ListingReservation
                  price={listing.info.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={() => { }}
                  disabled={isLoading}
                  disabledDates={[]}
                />
                <div className="pt-8"><Map center={[listing.info.location.lat, listing.info.location.long]} /></div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}

export default ListingClient;
