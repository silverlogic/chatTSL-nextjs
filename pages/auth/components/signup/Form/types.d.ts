import { ISignUp } from '@baseapp-frontend/core'

export type IFormProps = Pick<ISignUp, 'form'> & {
  isLoading?: boolean
}
