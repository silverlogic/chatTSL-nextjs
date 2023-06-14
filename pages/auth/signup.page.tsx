import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useSignUp, useLogin, useUser } from '@baseapp-frontend/core'

import { signUpValidationSchema } from 'utils/formsUtils'
import SignUpForm from './components/signup/Form'

const defaultInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptConsent: false,
}

const SignUp: NextPage = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  const router = useRouter()

  const { mutation: loginMutation } = useLogin({
    onSuccess: () => {
      router.push('/')
    },
  })

  const { form } = useSignUp({
    validationSchema: signUpValidationSchema,
    defaultValues: defaultInitialValues,
    onSuccess: (response: any, variables: any) => {
      loginMutation.mutate(variables as unknown as void)
    },
  })

  return <SignUpForm form={form} isLoading={loginMutation.isLoading || loginMutation.isSuccess} />
}

export default SignUp
