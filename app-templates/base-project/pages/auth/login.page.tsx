import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField, PasswordField } from '@baseapp-frontend/design-system-mui'
import { useLogin, useUser, useMfaConfiguration, ILoginResponse, ILoginMfaResponse, MfaMethodEnum } from '@baseapp-frontend/core'
import Link from 'next/link'
import {Box , Typography} from '@mui/material'
import _ from 'lodash'
import useNotifications from '../../hooks/useNotifications'
import { MfaMethodHumanize } from './mfa/constants'

const Login: NextPage = () => {
  // On this example we want the logged in user to go to / but in your
  // app it could be /dashboard or /user/:ID
  // useUser({
  //   redirectTo: '/',
  //   redirectIfFound: true,
  // })
  const {showError} = useNotifications()

  const [loginResult, setLoginResult] = useState<ILoginResponse | ILoginMfaResponse | null>(null)

  const router = useRouter()

  function loginRequiresMfa(responseData: any) {
    return responseData && responseData.method
  }

  function handleLoginSuccess() {
    router.push('/')
  }

  function goToMfaStatusPage() {
    router.push('/auth/mfa')
  }

  const handleLoginResponse = (response: any) => {
    setLoginResult(response.data)
  }

  const handleMfaResponse = (response: any) => {
    handleLoginSuccess()
  }

  const { form, mfaForm } = useLogin({
    onSuccess: handleLoginResponse,
    onError: showError,
    onMfaSuccess: handleMfaResponse,
    onMfaError: showError,
  })

  const shouldCheckMfaConfiguration = !!loginResult && !loginRequiresMfa(loginResult)
  const {configuration: mfaConfiguration} = useMfaConfiguration({enabled: shouldCheckMfaConfiguration})

  useEffect(() => {
    if (!loginResult || !mfaConfiguration) return

    if (!loginRequiresMfa(loginResult)) {
      const hasAnyMfaMethodsAvailable = !_.isEmpty(mfaConfiguration?.methods)
      if (hasAnyMfaMethodsAvailable) {
        goToMfaStatusPage()
        return
      } else {
        handleLoginSuccess()  
        return
      }
    }
  }, [loginResult, mfaConfiguration])

  function getCodeMessage() {
    const {method} = loginResult as ILoginMfaResponse

    if ([MfaMethodEnum.email, MfaMethodEnum.smsTwilio].includes(method as MfaMethodEnum)) {
      return `We just sent you a message via ${MfaMethodHumanize[method]} with your authentication code. `
    }

    if (method === MfaMethodEnum.app) {
      return `Check your ${MfaMethodHumanize[method]} for your authentication code. `
    }
  }

  function renderMfaForm() {
    return (
      <>
      <Typography component="h1" variant="h5">
        Two-Factor Authentication
      </Typography>
      <Typography variant="body1">
        {getCodeMessage()}
      </Typography>
      <Typography variant="body1">
        Enter the code in the form below to verify your identity.
      </Typography>
      <Box component="form" key="mfa" onSubmit={mfaForm.handleSubmit}>
          <TextField
              margin="normal"
              label="Code"
              name="code"
              placeholder="Enter Code"
              form={mfaForm}
              fullWidth
            />

            <ButtonWithLoading type="submit" form={mfaForm} sx={{ mt: 2, mb: 2 }}>
              Send
            </ButtonWithLoading>
      </Box>
      </>
    )
  }

  function renderLoginForm() {
    return (
      <>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form" key="login" onSubmit={form.handleSubmit}>
      <fieldset style={{border: 0}}>
        <TextField
          label="Email Address"
          name="email"

          type="email"
          placeholder="Email"
          form={form}
          fullWidth
          margin="normal"
        />

        <PasswordField label="Password" name="password" form={form} fullWidth margin="normal"/>
        <Box sx={{ mb: '8px' }}>
          <Link href="/auth/forgot-password" passHref>
            Forgot Password
          </Link>
        </Box>

        <ButtonWithLoading type="submit" form={form} sx={{ mt: 2, mb: 2 }}>
          Login
        </ButtonWithLoading>
      </fieldset>
    </Box>
    </>
    )
  }


  return (
    <div>
      <Head>
        <title>Login | BaseApp</title>
      </Head>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      {
        loginRequiresMfa(loginResult) ? renderMfaForm() : renderLoginForm()
      }
    </Box>
    </div>
  )
}

export default Login
