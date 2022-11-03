import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  Bars3CenterLeftIcon,
  ClipboardIcon,
  IdentificationIcon,
  MegaphoneIcon,
  UserCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const noticeMenu: Menu[] = [
  {
    name: '총무부',
    src: '/board/general'
  },
  {
    name: '행사진행부',
    src: '/board/event'
  },
  {
    name: '캠페인운영부',
    src: '/board/campaign'
  },
  {
    name: '체육부',
    src: '/board/sports'
  },
  {
    name: '학생인권부',
    src: '/board/rights'
  }
]

const Header: FC = () => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const HeaderRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen(!isOpen)

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.reload()
  }

  const outsideClickHandler = useCallback((e: MouseEvent) => {
    const isInside = HeaderRef.current?.contains(e.target as Node)
    if (!isInside) {
      setOpen(false)
      document.removeEventListener('click', outsideClickHandler)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) setIsLoggedIn(true)
    if (isOpen) document.addEventListener('click', outsideClickHandler)
  }, [isOpen, outsideClickHandler])

  return (
    <div
      className="flex font-pretandard-regular fixed p-4 top-0 lg:left-24 right-0 w-full"
      ref={HeaderRef}
    >
      <Link href="/">
        <a className="flex space-x-2">
          <Image src="/static/images/logo.webp" width={45} height={40} alt="logo" />
          <div className="flex flex-col items-center pt-0.5">
            <div className="font-pretandard-semibold text-xl tracking-widest">백현중학교</div>
            <div className="font-pretandard-extralight text-xs">Bakhyun Middle School</div>
          </div>
        </a>
      </Link>
      <button onClick={toggleMenu} className="fixed top-5 right-6 lg:right-24">
        <Bars3CenterLeftIcon className="w-9 h-9" />
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex flex-col font-pretandard-medium fixed top-0 right-0 bottom-0 text-2xl w-60 pl-14 bg-white shadow-2xl z-10">
          <button onClick={toggleMenu} className="mt-8 self-end mr-8">
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div className="flex flex-col text-lg space-y-6 mt-16">
            <Link href="/about">
              <a className="flex items-center space-x-1">
                <IdentificationIcon className="w-6 h-6" />
                <span>소개</span>
              </a>
            </Link>
            <div className="flex items-center space-x-1">
              <MegaphoneIcon className="w-6 h-6" />
              <span>공지사항</span>
            </div>
            <div className="flex flex-col space-y-4 pl-2 font-pretandard-light">
              {Object.keys(noticeMenu).map((index) => (
                <Link key={index} href={noticeMenu[Number(index)].src}>
                  <a>{noticeMenu[Number(index)].name}</a>
                </Link>
              ))}
            </div>
            <Link href="/board">
              <a className="flex items-center space-x-1">
                <ClipboardIcon className="w-6 h-6" />
                <span>자유게시판</span>
              </a>
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/mypage">
                  <a className="flex items-center space-x-1">
                    <UserCircleIcon className="w-6 h-6" />
                    <span>마이페이지</span>
                  </a>
                </Link>
                <button className="flex items-center space-x-1" onClick={handleLogout}>
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <Link href="/login">
                <a className="flex items-center space-x-1">
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                  <span>로그인</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </Transition>
    </div>
  )
}

interface Menu {
  name: string
  src: string
}

export default Header
