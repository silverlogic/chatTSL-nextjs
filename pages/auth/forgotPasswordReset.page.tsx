import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InputField, ButtonWithLoading, PasswordField } from 'baseapp-nextjs-core'
import { useResetPassword } from 'baseapp-nextjs-core'

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
        <title>Forgot Password Reset| BaseApp</title>
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
