import { useUser } from '@baseapp-frontend/core'
import { Box } from '@mui/material'
import ChatInterface from 'components/ChatInterface'
import VerifyEmail from 'components/VerifyEmail'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Chat = () => {
  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  })

  if (user && !user.isEmailVerified) {
    return <VerifyEmail />
  }

  return <ChatInterface />
}

export default Chat
