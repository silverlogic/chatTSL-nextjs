import Link from 'next/link'
import {
  AlternativeAuthLink,
  Button,
  CircularProgress,
  Container,
  FormContainer,
  Input,
  LeftContainer,
  PasswordInput,
  RightContainer,
  Text,
  Title,
} from './styled'
import { IFormProps } from './types'

export default function SignUpForm({ form, isLoading }: IFormProps) {
  return (
    <Container>
      <LeftContainer>
        <FormContainer>
          <Title>Register</Title>
          <form onSubmit={form.handleSubmit}>
            <Input label="First Name*" name="firstName" placeholder="First Name" form={form} />

            <Input label="Last Name*" name="lastName" placeholder="Last Name" form={form} />

            <Input
              label="Email Address*"
              name="email"
              type="email"
              placeholder="Email"
              form={form}
            />

            <PasswordInput label="Password*" name="password" form={form} />

            <Button loading={false} type="submit" form={form}>
              {form?.formState?.isSubmitting || form?.formState?.isSubmitSuccessful || isLoading ? (
                <CircularProgress size="20px" />
              ) : (
                'Create account'
              )}
            </Button>

            <Text>Already have an account?</Text>
            <AlternativeAuthLink>
              <Link href="/auth/login">Login Here</Link>
            </AlternativeAuthLink>
          </form>
        </FormContainer>
      </LeftContainer>
      <RightContainer />
    </Container>
  )
}
