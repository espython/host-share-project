'use client'
export const dynamic = 'force-dynamic'
import { Suspense, use } from "react";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/container";
import getListings, { IListingsParams } from "./api/getListings";
import EmptyState from "./components/EmptyState";
import * as NextDynamic from "next/dynamic";
import SkeletonImgLoading from "./components/SkeletonImgLoading";



const WithCustomLoading = NextDynamic.default(
  () => import("./components/Listings/ListingCard"),
  {
    loading: () => <div className="p-0"><SkeletonImgLoading /></div>,
  },
);



interface HomeProps {
  searchParams: IListingsParams
};
const dataPromise = async (searchParams: any) => getListings(searchParams)

export default async function Home({ searchParams }: HomeProps) {
  const listings = await dataPromise(searchParams);


  return (

    <ClientOnly>

      <Container>
        {listings?.length > 0 ? <div
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
          <Suspense fallback="...loading">
            {listings.map((listing: any, i: number) => (
              <WithCustomLoading data={listing} key={i} />
            ))}

          </Suspense>
        </div> : <EmptyState />}
      </Container>

    </ClientOnly>

  )
}


