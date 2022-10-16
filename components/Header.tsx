import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
  return (
    <div className="flex font-pretandard-regular fixed p-4 top-0 left-0 right-0 w-full">
      <Link href="/">
        <a>
          <Image src="/static/images/logo.webp" width={50} height={50} alt="logo" />
        </a>
      </Link>
    </div>
  )
}

export default Header
