import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ButtonWithLoading, TextField } from '@baseapp-frontend/design-system-mui'
import { useRecoverPassword } from '@baseapp-frontend/core'
import Head from 'next/head'

const ForgotPassword: NextPage = () => {
  const router = useRouter()

  const { form } = useRecoverPassword({
    onSuccess: () => {
      router.push('/auth/forgot-password-reset')
    },
  })

  return (
    <div>
      <Head>
        <title>Forgot Password Reset| BaseApp</title>
      </Head>
      <form onSubmit={form.handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            fullWidth
            form={form}
            sx={{ mb: '8px' }}
          />

          <ButtonWithLoading type="submit" form={form}>
            Send
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPassword
