import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useLogin, useUser, ILoginResponse, ILoginMfaResponse } from '@baseapp-frontend/core'

import useNotifications from '../../hooks/useNotifications'

import LoginForm from './components/login/Form'

const Login: NextPage = () => {
  // On this example we want the logged in user to go to / but in your
  // app it could be /dashboard or /user/:ID
  useUser({
    redirectTo: '/chat',
    redirectIfFound: true,
  })
  const { showError } = useNotifications()

  const [loginResult, setLoginResult] = useState<ILoginResponse | ILoginMfaResponse | null>(null)

  const router = useRouter()

  function handleLoginSuccess() {
    router.push('/chat')
  }

  const handleLoginResponse = (response: any) => {
    setLoginResult(response.data)
  }

  const { form } = useLogin({
    onSuccess: handleLoginResponse,
    onError: showError,
  })

  useEffect(() => {
    if (!loginResult) return

    handleLoginSuccess()
  }, [loginResult])

  return (
    <div>
      <Head>
        <title>Login | BaseApp</title>
      </Head>

      <LoginForm form={form} />
    </div>
  )
}

export default Login
