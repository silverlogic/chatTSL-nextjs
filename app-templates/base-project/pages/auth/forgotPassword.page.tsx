import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField } from '@baseapp-frontend/design-system-mui'
import { useRecoverPassword } from '@baseapp-frontend/core'
import Head from 'next/head'

const ForgotPassword: NextPage = () => {
  const router = useRouter()

  const { formik } = useRecoverPassword({
    onSuccess: () => {
      router.push('/auth/forgotPasswordReset')
    },
  })

  return (
    <div>
      <Head>
        <title>Forgot Password Reset| BaseApp</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />

          <ButtonWithLoading type="submit" formik={formik}>
            Send
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPassword
