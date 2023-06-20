import { OutlinedInputProps, BoxProps } from '@mui/material'

interface IInput {
  onSubmit: (string) => void,
  isLoading: boolean,
  disabled: boolean
}

interface IWebSocketMessage<PayloadType> {
  eventType: string,
  payload: PayloadType
}

interface IChatInterfaceProps {
  chat: IOpenAIChat
}

interface IStyledOutlinedInputProps extends OutlinedInputProps {
  isLoading: boolean
}

interface IMessageContainerProps extends BoxProps {
  isUserQuestion: boolean
}
