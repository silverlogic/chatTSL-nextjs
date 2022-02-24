import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InputField, PasswordField, ButtonWithLoading } from 'baseapp-nextjs-core'
import { useLogin, useUser } from 'baseapp-nextjs-core'

const Login: NextPage = () => {
  // On this example we want the logged in user to go to / but in your
  // app it could be /dashboard or /user/:ID

  useUser({
    redirectTo: '/',
    redirectIfFound: true
  })

  const router = useRouter()

  const { formik } = useLogin({
    onSuccess: () => {
      router.push('/')
    }
  })

  return (
    <div>
      <Head>
        <title>Login | BaseApp</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Login</legend>

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />

          <PasswordField
            label="Password"
            name="password"
            formik={formik}
          />

          <ButtonWithLoading type="submit" formik={formik}>Login</ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default Login
