import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Logo: FC<LogoProps> = ({ character }) => {
  return (
    <Link href="/">
      <a className="flex space-x-2">
        <Image src="/static/images/logo.webp" width={50} height={50} alt="logo" />
        {character && (
          <div className="flex flex-col items-center pt-0.5">
            <div className="font-pretandard-semibold text-2xl tracking-widest">백현중학교</div>
            <div className="font-pretandard-extralight text-xs">Bakhyun Middle School</div>
          </div>
        )}
      </a>
    </Link>
  )
}

interface LogoProps {
  character: boolean
}

export default Logo
