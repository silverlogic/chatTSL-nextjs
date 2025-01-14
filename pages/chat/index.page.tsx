import React, { useState, useEffect } from 'react'
import { useUser } from '@baseapp-frontend/core'
import { useMutation } from 'react-query'
import ChatInterface from 'components/ChatInterface'
import VerifyEmail from 'components/VerifyEmail'
import OpenAIChatAPI from '../../api/OpenAIChatAPI'

const Chat = () => {
  const { user } = useUser({
    redirectTo: '/',
  })

  const [chat, setChat] = useState<IOpenAIChat | undefined>()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['openAIChat'],
    mutationFn: async (newChat: IOpenAIChat) => {
      setChat(newChat)
    }
  })

  async function createChat() {
    const chat = await OpenAIChatAPI.create({ model: "gpt-4o-mini" })
    mutate(chat)
  }

  useEffect(() => {
    if (!chat) {
      createChat()
    }
  }, [chat])

  if (user && !user.isEmailVerified) {
    return <VerifyEmail />
  }

  if (isLoading || !chat) {
    return <div />
  }

  return (
    <ChatInterface
      chat={chat}
      onChatUpdated={(updatedChat) => {
        mutate(updatedChat)
      }}
    />
  )
}

export default Chat
