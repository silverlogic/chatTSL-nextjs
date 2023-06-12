import { OutlinedInputProps, BoxProps } from '@mui/material'

interface IQuestionAndAnswer {
  question: string
  isUserQuestion: boolean
  image: string
  index?: number
}

type IUserQuestions = Array<IQuestionAndAnswer> | []

interface IInput {
  isFetchingResponse: boolean
  setIsFetchingResponse: (newValue: boolean) => void
  currentQuestion: string
  userQuestions: IUserQuestions
  setCurrentQuestion: (newQuestion: string) => void
  setUserQuestions: (newArray: IUserQuestions) => void
}

interface IStyledOutlinedInputProps extends OutlinedInputProps {
  isFetchingResponse: boolean
}

interface IMessageContainerProps extends BoxProps {
  isUserQuestion: boolean
}
