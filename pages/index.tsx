import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const Main: NextPage = () => {
  return (
    <div className="w-full h-screen bg-hero bg-cover">
      <div className="flex w-full h-full flex-col justify-center">
        <div className="w-11/12 h-3/5 md:w-3/5 lg:w-2/5 md:h-3/5 grid self-center items-center justify-items-center text-2xl md:space-y-2 bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="self-start flex items-center pb-2">
              <Image src="/static/images/logo.webp" width={80} height={80} alt="logo" />
            </div>
            <p className="text-xl md:text-2xl self-start">환영합니다.</p>
            <p className="text-xl md:text-2xl self-start font-pretandard-semibold">
              로그인하여 서비스를 이용하세요.
            </p>
            <Link href="login">
              <a>
                <button className="flex justify-self-center text-lg border border-slate-100 hover:shadow-none hover:opacity-80 shadow-sm py-5 px-8 md:p-4 md:px-10 font-pretandard-semibold rounded-xl items-center space-x-4 mt-4">
                  <Image
                    src="/static/images/google.webp"
                    width={20}
                    height={20}
                    alt="google_login"
                  />
                  <p>학교 구글 계정으로 로그인</p>
                </button>
              </a>
            </Link>
            <p className="text-sm pt-4 md:text-base font-pretandard-light md:pt-3">
              * 학교에서 지급 받으신 구글 계정을 통해 로그인하세요. <br />
              <span className="hidden">&nbsp;&nbsp;</span> 자세한 사항은 담당 선생님께 문의하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
