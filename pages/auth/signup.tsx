import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { InputField, PasswordField, CheckboxField, ButtonWithLoading } from 'baseapp-nextjs-core'
import { useSignUp, useLogin } from 'baseapp-nextjs-core'

const SignUp: NextPage = () => {
  const router = useRouter()

  const { mutation: loginMutation } = useLogin()

  const { formik } = useSignUp({
    onSuccess: (response: any, variables: any) => {
      loginMutation.mutate({
        email: variables?.email,
        password: variables?.password,
      } as unknown as void, {
        onSuccess: () => {
          router.push('/')
        }
      })
    }
  })

  return (
    <div>
      <Head>
        <title>Sign Up | BaseApp</title>
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Sign Up</legend>

          <InputField
            label="First Name"
            name="firstName"
            placeholder="First Name"
            formik={formik}
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            formik={formik}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />

          <InputField
            label="Phone"
            name="phoneNumber"
            placeholder="Phone Number"
            formik={formik}
          />

          <PasswordField
            label="Password"
            name="password"
            formik={formik}
          />

          <CheckboxField
            label="I agree to the Terms & Conditions"
            name="acceptConsent"
            formik={formik}
          />

          <ButtonWithLoading type="submit" formik={formik}>Sign Up</ButtonWithLoading>
        </fieldset>
      </form>
    </div>
  )
}

export default SignUp
