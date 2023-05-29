'use client'

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import { use, useMemo } from "react";
import { dataPromise } from "@/app/components/navbar/Categories";

interface IParams {
  id?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  const data = use(dataPromise)
  const id = params?.id

  const listing = useMemo(() => { return data.data?.find(item => item.info.id === id) }, [id]);


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
