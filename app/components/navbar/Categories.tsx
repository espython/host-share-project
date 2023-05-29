'use client'
import { getData } from "@/app/api/api";
import { CategoriesEntity, Listing } from "@/app/types/listings";
import { usePathname, useSearchParams } from "next/navigation";
import { use, useMemo } from "react";
import { MdHouseboat, MdOutlineCabin } from "react-icons/md";
import { TbBeach, TbPool } from "react-icons/tb";
import { GiModernCity, GiTreehouse } from "react-icons/gi"
import { FaSkiing } from "react-icons/fa"
import Container from "../container";
import CategoryContainer from "../CategoryContainer";
import { IconType } from "react-icons";

export const dataPromise: Promise<Listing> = getData();

function Categories() {
  const data = use(dataPromise)
  const params = useSearchParams()
  const category = params.get('category')
  const pathName = usePathname()
  const isMainPage = pathName === "/"



  const categorieswithIcons = useMemo(() => {
    let categories = data?.categories?.slice(1, 8);
    return categories?.map((item: CategoriesEntity) => {
      switch (item.type) {
        case 'amazing-pools':
          return { ...item, icon: TbPool }
        case 'cabins':
          return { ...item, icon: MdOutlineCabin }
        case 'countryside':
          return { ...item, icon: GiTreehouse }
        case 'skiing':
          return { ...item, icon: FaSkiing }
        case 'lake':
          return { ...item, icon: MdHouseboat }
        case 'beachfront':
          return { ...item, icon: TbBeach }
        case 'iconic-cities':
          return { ...item, icon: GiModernCity }

      }
    })

  }, [data.categories?.length])



  if (!isMainPage) return null
  return (
    <Container>
      <div className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
      ">
        {categorieswithIcons?.map(item => <CategoryContainer key={item?.id} icon={item?.icon as IconType} title={item?.title as string} selected={item?.title === category} />)}
      </div>
    </Container>
  )
}

export default Categories