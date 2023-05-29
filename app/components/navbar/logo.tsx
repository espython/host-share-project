'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
function Logo() {
  const router = useRouter()
  return (
    <Image alt='logo'
      onClick={() => router.push("/")}
      className='hidden md:block md:mr-3 cursor-pointer'
      height="100"
      width="100"
      src="/images/logo.png" />
  )
}

export default Logo