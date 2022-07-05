import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { InputField, ButtonWithLoading, PasswordField } from 'baseapp-nextjs-core'
import { useResetPassword } from 'baseapp-nextjs-core'
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

          <InputField label="Token" name="token" placeholder="token" formik={formik} />

          <ButtonWithLoading type="submit" formik={formik}>
            Send
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPasswordReset
