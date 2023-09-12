import { Box } from '@mui/system'
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
} from '../../signup/Form/styled'
import { IFormProps } from '../../signup/Form/types'

const LoginForm = ({ form }: IFormProps) => {
  return (
    <Container>
      <LeftContainer>
        <FormContainer>
          <Title>Login</Title>
          <Box component="form" key="login" onSubmit={form.handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email"
              form={form}
              fullWidth
              margin="normal"
              variant="filled"
              InputLabelProps={{ shrink: true }}
            />

            <PasswordInput label="Password" name="password" form={form} fullWidth margin="normal" variant="filled" InputLabelProps={{ shrink: true }} />

            <Button loading={false} type="submit" form={form}>
              {form?.formState?.isSubmitting || form?.formState?.isSubmitSuccessful ? (
                <CircularProgress size="20px" />
              ) : (
                'Login'
              )}
            </Button>
            <Text>Don&apos;t have an account?</Text>
            <AlternativeAuthLink>
              <Link href="/auth/signup">Signup Here</Link>
            </AlternativeAuthLink>
          </Box>
        </FormContainer>
      </LeftContainer>
      <RightContainer />
    </Container>
  )
}

export default LoginForm
