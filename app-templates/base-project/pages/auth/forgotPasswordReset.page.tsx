import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField, PasswordField } from '@baseapp-frontend/design-system-mui'
import { useResetPassword } from '@baseapp-frontend/core'
import Head from 'next/head'

const ForgotPasswordReset: NextPage = () => {
  const router = useRouter()

  const { formik } = useResetPassword({
    onSuccess: () => {
      router.push('/')
    },
  })

  return (
    <div>
      <Head>
        <title>BaseApp - Forgot Password Reset</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>

          <PasswordField label="New password" name="newPassword" formik={formik} />

          <TextField label="Token" name="token" placeholder="token" formik={formik} />

          <ButtonWithLoading type="submit" formik={formik}>
            Send
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPasswordReset
