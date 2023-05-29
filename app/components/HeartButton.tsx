'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";


import ClientOnly from "./ClientOnly";
import { useCallback, useState } from "react";

interface HeartButtonProps {
  listingId: string

}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,

}) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: any) => {
    e.stopPropagation()
    setIsFavorite(isFavorite => !isFavorite)
  }


  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          isFavorite ? 'fill-primary' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;