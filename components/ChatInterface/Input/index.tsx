import { Send } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { FC, FormEvent, KeyboardEvent } from 'react'
import { InputContainer, InputExplanationText, StyledOutlinedInput } from '../styled'
import { IInput } from '../types'

const Input: FC<IInput> = ({
  isFetchingResponse,
  setIsFetchingResponse,
  currentQuestion,
  userQuestions,
  setCurrentQuestion,
  setUserQuestions,
}) => {
  const isUserMessageBlank = (string: string) => {
    const validation = string.replace(/\s/g, '')
    return validation.length === 0
  }

  const submitAnswer = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (!isFetchingResponse && !isUserMessageBlank(currentQuestion)) {
      setIsFetchingResponse(true)
      const newQuestion = {
        question: currentQuestion,
        isUserQuestion: true,
        image: '/assets/CJ2.png',
      }
      const replyQuestion = {
        question:
          'Yes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are right , you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are right , you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are right , you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are rightYes, you are right',
        isUserQuestion: false,
        image: '/assets/ChatBotProfile.png',
        index: userQuestions.length + 2,
      }
      setCurrentQuestion('')
      setUserQuestions([...userQuestions, newQuestion, replyQuestion])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      submitAnswer(e)
    }
  }
  return (
    <InputContainer>
      <form onSubmit={(e) => submitAnswer(e)} style={{ width: '80%' }}>
        <StyledOutlinedInput
          isFetchingResponse={isFetchingResponse}
          placeholder="Ask a question."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          multiline
          minRows={1}
          maxRows={6}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" disabled={isFetchingResponse}>
                <Send
                  sx={(theme) => ({
                    color:
                      currentQuestion && !isFetchingResponse
                        ? theme.palette.primary[500]
                        : theme.palette.surface[500],
                  })}
                />
              </IconButton>
            </InputAdornment>
          }
        />
      </form>
      <InputExplanationText>
        Make sure to double check your answer in the linked citation
      </InputExplanationText>
    </InputContainer>
  )
}

export default Input
