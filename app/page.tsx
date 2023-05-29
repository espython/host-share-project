'use client'
import { use } from "react";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/container";
import { dataPromise } from "./components/navbar/Categories";
import ListingCard from "./components/Listings/ListingCard";




export default function Home(props: any) {
  const data = use(dataPromise)

  return (

    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {data?.data?.map((listing: any, i) => (
            <ListingCard
              key={i}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>

  )
}


