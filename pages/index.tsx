import type { NextPage } from 'next'
import Image from 'next/image'

const Main: NextPage = () => {
  return (
    <div className="w-full h-screen bg-hero bg-cover">
      <div className="w-full h-full flex flex-col justify-center">
        <div className="w-2/5 h-3/5 grid self-center items-center justify-items-center text-2xl space-y-2 bg-white rounded-3xl p-2 shadow-2xl">
          <div className="grid">
            <div>
              <Image src="/static/images/logo.webp" width={80} height={80} />
            </div>
            <p>환영합니다.</p>
            <p className="font-pretandard-semibold">로그인하여 서비스를 이용하세요.</p>
            <button className="flex justify-self-center border border-slate-100 hover:opacity-60 shadow-xl p-4 px-10 text-lg font-pretandard-semibold rounded-xl items-center space-x-2 mt-4">
              <Image src="/static/images/google.webp" width={20} height={20} />
              <p>Google 학교 계정으로 로그인</p>
            </button>
            <p className="text-base font-pretandard-light pt-3">
              * 학교에서 지급 받으신 구글 계정을 통해 로그인하세요. <br />
              &nbsp;&nbsp; 자세한 사항은 담당 선생님께 문의하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
