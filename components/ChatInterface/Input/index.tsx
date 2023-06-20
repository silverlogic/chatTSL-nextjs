import { Send } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { FC, FormEvent, KeyboardEvent } from 'react'
import { InputContainer, InputExplanationText, StyledOutlinedInput } from '../styled'
import { IInput } from '../types'
import { useState } from 'react'

const Input: FC<IInput> = ({ onSubmit, isLoading, disabled }) => {
  const [currentText, setCurrentText] = useState<string>('')

  const isUserMessageBlank = (string: string) => {
    const validation = string.replace(/\s/g, '')
    return validation.length === 0
  }

  const submitAnswer = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (!disabled && !isUserMessageBlank(currentText)) {
      onSubmit(currentText)
      setCurrentText('')
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
          isLoading={isLoading}
          placeholder="Ask a question."
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          multiline
          minRows={1}
          maxRows={6}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" disabled={disabled}>
                <Send
                  sx={(theme) => ({
                    color:
                      currentText && !disabled
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
