'use client'
import Image from "next/image"
interface IProps {
  src?: string
}
function Avatar({ src }: IProps) {
  return (
    <Image className="
      rounded-full
      
    "
      height="30"
      width="30"
      alt="avatar"
      src={!src?.length ? "/images/userPlaceholder.png" : src}
    />
  )
}

export default Avatar