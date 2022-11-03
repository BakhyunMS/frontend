import { NextPage } from 'next'
import { gql, useMutation } from '@apollo/client'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import {
  ArrowRightOnRectangleIcon,
  CalculatorIcon,
  CheckIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid'
import { toast, ToastContainer } from 'react-toastify'
import React, { MouseEventHandler, useCallback, useState } from 'react'
import Header from '../components/Header'
import 'react-toastify/dist/ReactToastify.css'
import { ResponseData } from '../types'
import { useRouter } from 'next/router'

const Join: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [studentId, setstudentId] = useState('')
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [verifyPage, setVerifyPage] = useState(true)
  const [isExistingUser, setIsExistingUser] = useState(true)

  let router = useRouter()

  const redirect = (route: string) => {
    router.push(route)
  }

  const onVerifyCode = (data: ResponseData) => {
    const {
      verifyCode: { ok, message }
    } = data
    if (ok) {
      alert('회원가입에 성공하였습니다. 로그인하여 주세요.')
      return redirect('/login')
    } else alert(message)
  }

  const onSendCode = (data: ResponseData) => {
    const {
      sendCode: { ok, message }
    } = data
    if (ok) {
      setVerifyPage(false)
      return toast.success('이메일을 전송하였습니다.')
    } else alert(message)
  }

  const onCheckUser = (data: ResponseData) => {
    const {
      checkUser: { ok }
    } = data
    if (!ok) {
      setIsExistingUser(false)
    }
  }

  const [verify, { loading: verifyLoading }] = useMutation(VERIFY_CODE, {
    onCompleted: onVerifyCode
  })
  const [sendCode, { loading: sendCodeLoading }] = useMutation(SEND_CODE, {
    onCompleted: onSendCode
  })
  const [checkUser, { loading: checkUserLoading }] = useMutation(CHECK_USER, {
    onCompleted: onCheckUser
  })

  const checkName = (name: string) => {
    const nameCode = name.charCodeAt(0)
    if (0x1100 <= nameCode && nameCode <= 0x11ff) return true
    if (0x3130 <= nameCode && nameCode <= 0x318f) return true
    if (0xac00 <= nameCode && nameCode <= 0xd7a3) return true
    return false
  }

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const checkpassword = (password: string): number => {
    let strength = 0
    if (password.match(/[a-z]+/)) strength += 1
    if (password.match(/[A-Z]+/)) strength += 1
    if (password.match(/[0-9]+/)) strength += 1
    if (password.match(/[$@#&!]+/)) strength += 1
    return strength
  }

  const validateInputData = useCallback(async () => {
    if (name.length < 1 || password.length < 1 || email.length < 1 || studentId.length < 1) {
      toast.error('정보를 입력해 주세요!')
      return false
    }
    if (!checkName(name)) {
      toast.error('이름은 한글로 작성해주세요.')
      return false
    }
    if (!Number(studentId) || studentId.length !== 5) {
      toast.error('학번이 잘못되었습니다.')
      return false
    }
    if (!validateEmail(email)) {
      toast.error('이메일 양식이 올바르지 않습니다.')
      return false
    }
    if (password.length < 8) {
      toast.error('비밀번호는 8자 이상을 작성해주세요.')
      return false
    }
    if (password.length > 12) {
      toast.error('비밀번호는 최대 12까지 작성이 가능합니다.')
      return false
    }
    if (name.length > 11) {
      toast.error('이름은 최대 10자까지 작성이 가능합니다.')
      return false
    }
    if (checkpassword(password) < 4) {
      toast.error('비밀번호 규칙이 잘못되었습니다.')
      return false
    }
    if (isExistingUser) {
      toast.error('존재하는 이메일입니다.')
      return false
    }
    return true
  }, [name, email, password, studentId, isExistingUser])

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setName(event.target.value)

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setEmail(event.target.value)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleStudentIdChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setstudentId(event.target.value)

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setCode(event.target.value)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault()

  const handleSendLink = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault()
      if (!checkUserLoading) checkUser({ variables: { email } })
      if (await validateInputData()) {
        if (!sendCodeLoading) sendCode({ variables: { email } })
        else return
      } else return
    },
    [sendCode, validateInputData, email, sendCodeLoading, checkUser, checkUserLoading]
  )

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault()

      if (code.length === 6 && Number(code)) {
        if (!verifyLoading) verify({ variables: { email, code, password, name, studentId } })
      } else {
        toast.error('코드 형식이 잘못되었습니다.')
        return false
      }
    },
    [name, email, password, studentId, code, verify, verifyLoading]
  )

  return (
    <div className="flex justify-center h-screen lg:bg-hero lg:bg-cover">
      <Header />
      <div className="flex flex-col self-center bg-white p-16 md:px-36 md:py-24 rounded-3xl lg:shadow-2xl">
        <div className="text-3xl font-pretandard-extrabold pb-9 self-center">회원가입</div>
        <div className="flex flex-col space-y-6 pb-10 w-64">
          {verifyPage ? (
            <>
              <FormControl variant="standard">
                <InputLabel htmlFor="name" className="text-xl">
                  이름
                </InputLabel>
                <Input
                  id="name"
                  onChange={handleNameChange}
                  placeholder="홍길동"
                  startAdornment={
                    <InputAdornment position="start">
                      <UserCircleIcon className="h-6 w-6" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="studendId" className="text-xl">
                  학번
                </InputLabel>
                <Input
                  id="studendId"
                  onChange={handleStudentIdChange}
                  placeholder="10101"
                  startAdornment={
                    <InputAdornment position="start">
                      <CalculatorIcon className="h-6 w-6" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="email" className="text-xl">
                  이메일
                </InputLabel>
                <Input
                  id="email"
                  onChange={handleEmailChange}
                  placeholder="s10101@bakhyun.ms.kr"
                  startAdornment={
                    <InputAdornment position="start">
                      <EnvelopeIcon className="h-6 w-6" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="password" className="text-xl">
                  비밀번호
                </InputLabel>
                <Input
                  id="password"
                  onChange={handlePasswordChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="대소문자, 숫자, 특수기호 포함"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockClosedIcon className="h-6 w-6" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-3 w-3 " />
                        ) : (
                          <EyeSlashIcon className="h-3 w-3" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </>
          ) : (
            <FormControl variant="standard">
              <InputLabel htmlFor="code" className="text-xl">
                인증번호
              </InputLabel>
              <Input
                id="code"
                type="number"
                onChange={handleCodeChange}
                placeholder="000000"
                startAdornment={
                  <InputAdornment position="start">
                    <CheckIcon className="h-6 w-6" />
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
        </div>
        {verifyPage ? (
          <Button
            onClick={handleSendLink}
            variant="outlined"
            endIcon={<PaperAirplaneIcon className="w-5 h-5" />}
          >
            회원가입
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="outlined"
            endIcon={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
          >
            인증하기
          </Button>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

const CHECK_USER = gql`
  mutation CheckUser($email: String!) {
    checkUser(email: $email) {
      ok
    }
  }
`

const SEND_CODE = gql`
  mutation SendCode($email: String!) {
    sendCode(email: $email) {
      ok
      message
    }
  }
`

const VERIFY_CODE = gql`
  mutation VerifyCode(
    $email: String!
    $code: String!
    $password: String!
    $name: String!
    $studentId: String!
  ) {
    verifyCode(
      email: $email
      code: $code
      password: $password
      name: $name
      studentId: $studentId
    ) {
      ok
      message
    }
  }
`

export default Join
