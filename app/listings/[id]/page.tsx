'use client'

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import { use, useMemo } from "react";
import { dataPromise } from "@/app/components/navbar/Categories";

interface IParams {
  id?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const data = use(dataPromise)
  console.log("params", params)
  const listing = useMemo(() => { return data.data?.find(item => item.info.id === params.id) }, [params.id]);


  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
      />
    </ClientOnly>
  );
}

export default ListingPage;
