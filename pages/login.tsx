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

const Login: NextPage = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN)
  const [submitData, setSubmitData] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault()
      login({ variables: { ...submitData } })
      if (data) return alert(data.message)
    },
    [login, data, submitData]
  )
  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSubmitData({ email: event.target.value })
  }
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSubmitData({ password: event.target.value })
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div className="flex justify-center h-screen bg-hero bg-cover">
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
