import { NextPage } from 'next'
import Image from 'next/image'
import Header from '../components/Header'
import { Meal } from '../types'
import axios from 'axios'

const date = new Date()
const month = date.getMonth() + 1
const getMonth = month.toString().length === 2 ? String(month) : '0' + String(month)
const getDate =
  date.getDate().toString().length === 2 ? String(date.getDate()) : '0' + String(date.getDate())

const Main: NextPage<MainProps> = ({ meal }) => {
  let menu: string[] = []
  if (meal.mealServiceDietInfo[0].head[1].RESULT.CODE === 'INFO-000') {
    const data =
      meal.mealServiceDietInfo[1].row[meal.mealServiceDietInfo[1].row.length - 1].DDISH_NM
    menu = data.split('<br/>').map((dish) => dish.split('(')[0].trim().replace(/\*/gi, ''))
  }

  return (
    <div className="w-full">
      <Header />
      <div className="flex mt-20 bg-blue-300 justify-center items-center space-x-8 p-8 lg:p-0">
        <Image src="/static/images/main.svg" alt="이미지" width="250" height="400" />
        <div className="text-white space-y-4">
          <div className="text-xl lg:text-3xl font-pretandard-semibold">
            함께하는 백현중학교! <br />
            New Deal, 백현!
          </div>
          <div className="text-sm lg:text-base font-pretandard-extralight">
            백현중학교 학생 자치회는 여러분의 즐거운 학교 생활을 응원합니다. <br />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col justify-items-stretch space-x-8 mt-8 px-4">
        <div className="justify-self-start">메뉴메뉴</div>
        <div className="bg-slate-100 w-56 h-72 p-4 rounded-lg justify-self-end">
          <div className="font-pretandard-medium pb-2 border-b border-black mb-4 self-end">
            {getMonth}.{getDate}
          </div>
          <div className="space-y-1">
            {menu.length > 0 ? (
              menu.map((element, index) => <div key={index}>- {element}</div>)
            ) : (
              <div>급식이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const now = String(date.getFullYear()) + getMonth + getDate
  const res = await axios.get(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&KEY=${process.env.API_KEY}&SD_SCHUL_CODE=7551016&ATPT_OFCDC_SC_CODE=J10&MLSV_YMD=${now}`
  )

  if (now.length !== 8 || isNaN(Number(date)))
    return {
      props: { meal: { mealServiceDietInfo: [{ head: [{}, { RESULT: { CODE: 'date' } }] }] } }
    }
  if (!('mealServiceDietInfo' in res.data))
    return {
      props: { meal: { mealServiceDietInfo: [{ head: [{}, { RESULT: { CODE: 'error' } }] }] } }
    }
  return { props: { meal: res.data } }
}

interface MainProps {
  meal: Meal
}

export default Main
