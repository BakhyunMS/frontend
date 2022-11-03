import { NextPage } from 'next'
import { gql, useMutation } from '@apollo/client'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import {
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid'
import React, { MouseEventHandler, useCallback, useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import { ResponseData } from '../types'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'

const Login: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onCompleted = (data: ResponseData) => {
    const {
      login: { ok, message, token }
    } = data
    if (ok) {
      if (token) localStorage.setItem('token', token)
      else return alert('문제가 발생하였습니다. 담당 선생님께 문의하여주세요. (L1)')
      alert('로그인에 성공하였습니다.')
      return router.push('/')
    } else return toast.error(message)
  }

  const [login, { loading }] = useMutation(LOGIN, { onCompleted })

  const validateInputData = useCallback(async () => {
    if (email.length < 1 || password.length < 1) {
      toast.error('정보를 입력해 주세요!')
      return false
    }
    return true
  }, [email, password])

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault()
      if (await validateInputData()) {
        if (!loading) login({ variables: { email, password } })
      }
    },
    [login, email, password, loading, validateInputData]
  )

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setEmail(event.target.value)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setPassword(event.target.value)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) =>
    event.preventDefault()

  return (
    <div className="flex justify-center h-screen lg:bg-hero lg:bg-cover">
      <Header />
      <div className="flex flex-col self-center bg-white p-16 md:px-36 md:py-24 rounded-3xl shadow-2xl">
        <div className="text-3xl font-pretandard-extrabold pb-9 self-center">로그인</div>
        <div className="flex flex-col w-60 pb-10 space-y-6">
          <FormControl variant="standard">
            <InputLabel htmlFor="email" className="text-xl">
              이메일
            </InputLabel>
            <Input
              id="email"
              onChange={handleEmailChange}
              placeholder="이메일"
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
              placeholder="비밀번호"
              type={showPassword ? 'text' : 'password'}
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
        </div>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          endIcon={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
        >
          로그인
        </Button>
        <div className="font-pretandard-light pt-2">
          아직 가입하지 않으셨나요?
          <Link href="/join">
            <a className="text-blue-500 hover:text-blue-400"> 가입하기</a>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      message
      token
    }
  }
`

export default Login
