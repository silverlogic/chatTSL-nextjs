import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  TextField,
  PasswordField,
  CheckboxField,
  ButtonWithLoading,
} from '@baseapp-frontend/design-system-mui'
import { useSignUp, useLogin } from '@baseapp-frontend/core'
import Head from 'next/head'

const SignUp: NextPage = () => {
  const router = useRouter()

  const { mutation: loginMutation } = useLogin({
    onSuccess: () => {
      router.push('/')
    },
  })

  const { form } = useSignUp({
    onSuccess: (response: any, variables: any) => {
      loginMutation.mutate(variables as unknown as void)
    },
  })

  return (
    <div>
      <Head>
        <title>BaseApp - Sign Up</title>
      </Head>
      <form onSubmit={form.handleSubmit}>
        <fieldset>
          <legend>Sign Up</legend>

          <TextField
            label="First Name"
            name="firstName"
            placeholder="First Name"
            form={form}
          />

          <TextField
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            form={form}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            form={form}
          />

          <TextField
            label="Phone"
            name="phoneNumber"
            placeholder="Phone Number"
            form={form}
          />

          <PasswordField label="Password" name="password" form={form} />

          <CheckboxField
            label="I agree to the Terms & Conditions"
            name="acceptConsent"
            CheckboxProps={{ name: 'acceptConsent' }}
            form={form}
          />

          <ButtonWithLoading type="submit" form={form}>
            Sign Up
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default SignUp
