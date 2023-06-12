import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChatInterfaceContainer, MessageContainer, MessageContentContainer } from './styled'
import Input from './Input'
import { IUserQuestions } from './types'
import LoadingDots from './LoadingDots'
import BotResponse from './BotResponse'

const ChatInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [userQuestions, setUserQuestions] = useState<IUserQuestions>([])
  const [isFetchingResponse, setIsFetchingResponse] = useState<boolean>(false)

  const boxRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }

  useEffect(() => {
    const container = boxRef.current

    const observer = new MutationObserver(() => {
      if (container) {
        scrollToBottom()
      }
    })

    const observerConfig = { childList: true, subtree: true }

    if (container) {
      observer.observe(container, observerConfig)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFetchingResponse(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [userQuestions])

  return (
    <ChatInterfaceContainer>
      <Box sx={{ overflow: 'auto', paddingBottom: '9rem' }} ref={boxRef}>
        {userQuestions.length > 0 &&
          userQuestions.map((question, index: number) => (
            <MessageContainer isUserQuestion={question.isUserQuestion} key={index}>
              <MessageContentContainer>
                <Box sx={{ flexShrink: 0 }}>
                  <Image width="48px" height="48px" src={question.image} alt="avatar" />
                </Box>
                {question.isUserQuestion ? (
                  <Typography variant="body1" sx={{ marginTop: '12px' }}>
                    {question.question}
                  </Typography>
                ) : isFetchingResponse && userQuestions.length === question.index ? (
                  <LoadingDots />
                ) : (
                  <BotResponse response={question.question} />
                )}
              </MessageContentContainer>
            </MessageContainer>
          ))}
      </Box>
      <Input
        setIsFetchingResponse={setIsFetchingResponse}
        isFetchingResponse={isFetchingResponse}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        userQuestions={userQuestions}
        setUserQuestions={setUserQuestions}
      />
    </ChatInterfaceContainer>
  )
}

export default ChatInterface
