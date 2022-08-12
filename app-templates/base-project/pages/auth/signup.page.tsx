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

  const { formik } = useSignUp({
    onSuccess: (response: any, variables: any) => {
      loginMutation.mutate(variables as unknown as void)
    },
  })

  return (
    <div>
      <Head>
        <title>BaseApp - Sign Up</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Sign Up</legend>

          <TextField
            label="First Name"
            name="firstName"
            placeholder="First Name"
            formik={formik}
          />

          <TextField
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            formik={formik}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />

          <TextField
            label="Phone"
            name="phoneNumber"
            placeholder="Phone Number"
            formik={formik}
          />

          <PasswordField label="Password" name="password" formik={formik} />

          <CheckboxField
            label="I agree to the Terms & Conditions"
            name="acceptConsent"
            formik={formik}
          />

          <ButtonWithLoading type="submit" formik={formik}>
            Sign Up
          </ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default SignUp
