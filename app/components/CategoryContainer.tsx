'use client';

import { useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { useCallback } from "react";
import { IconType } from "react-icons";

export interface IProps {
  icon: IconType
  title: string
  selected?: boolean

}

function CategoryContainer({ icon: Icon, title, selected }: IProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: title
    }

    if (params?.get('category') === title) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [title, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
     flex flex-col 
     items-center 
     justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
     ${selected ? 'border-b-neutral-800' : 'border-transparent'}
     ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
      <Icon size={26} />
      <div className='font-medium text-sm'>{title}</div>
    </div>
  )
}

export default CategoryContainer