export interface Data {
  ok: string
  message: string
  token?: string
  data?: any
}

export interface ResponseData {
  [propName: string]: Data
}

export interface User {
  id: number
  email: string
  password: string
  studentId: string
  name: string
  createdAt: Date
  role: 'ADMIN' | 'USER'
  posts: Board[]
}

export interface Board {
  id: number
  title: string
  content: string
  author: User
  authorId: number
  createdAt: Date
  updatedAt: Date
  type: 'Rights' | 'Sports' | 'Campaign' | 'Event' | 'General' | 'Main'
}

export interface Meal {
  mealServiceDietInfo: [
    {
      head: [{ list_total_count: string }, { RESULT: { CODE: string; MESSAGE: string } }]
    },
    {
      row: {
        ATPT_OFCDC_SC_CODE: string
        ATPT_OFCDC_SC_NM: string
        SD_SCHUL_CODE: string
        SCHUL_NM: string
        MMEAL_SC_CODE: string
        MMEAL_SC_NM: string
        MLSV_YMD: string
        MLSV_FGR: string
        DDISH_NM: string
        ORPLC_INFO: string
        CAL_INFO: string
        NTR_INFO: string
        MLSV_FROM_YMD: string
        MLSV_TO_YMD: string
      }[]
    }
  ]
}
