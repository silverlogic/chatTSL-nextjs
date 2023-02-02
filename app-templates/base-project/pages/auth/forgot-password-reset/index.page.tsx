import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField, PasswordField } from '@baseapp-frontend/design-system-mui'
import { useResetPassword } from '@baseapp-frontend/core'
import Head from 'next/head'

const ForgotPasswordReset: NextPage = () => {
  const router = useRouter()

  const { form } = useResetPassword({
    onSuccess: () => {
      router.push('/')
    },
  })

  return (
    <div>
      <Head>
        <title>BaseApp - Forgot Password Reset</title>
      </Head>
      <form onSubmit={form.handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>

          <PasswordField label="New password" name="newPassword" form={form} fullWidth sx={{mb: 2}} />

          <TextField label="Token" name="token" placeholder="token" form={form}  fullWidth sx={{mb: 2}}/>

          <ButtonWithLoading type="submit" form={form}>
            Send
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPasswordReset
