import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InputField, ButtonWithLoading } from 'baseapp-nextjs-core'
import { useRecoverPassword } from 'baseapp-nextjs-core'

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

          <InputField
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
