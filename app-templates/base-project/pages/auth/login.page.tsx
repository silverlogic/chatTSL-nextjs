import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField, PasswordField } from '@baseapp-frontend/design-system-mui'
import { useLogin, useUser } from '@baseapp-frontend/core'
import Link from 'next/link'
import { Box } from '@mui/material'

const Login: NextPage = () => {
  // On this example we want the logged in user to go to / but in your
  // app it could be /dashboard or /user/:ID

  useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })

  const router = useRouter()

  const { formik } = useLogin({
    onSuccess: () => {
      router.push('/')
    },
  })

  return (
    <div>
      <Head>
        <title>Login | BaseApp</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Login</legend>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />

          <PasswordField label="Password" name="password" formik={formik} />
          <Box sx={{ mb: '8px' }}>
            <Link href="/auth/forgotPassword" passHref>
              Forgot Password
            </Link>
          </Box>

          <ButtonWithLoading type="submit" formik={formik}>
            Login
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default Login
