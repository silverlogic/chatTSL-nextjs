import { useUser } from '@baseapp-frontend/core'
import { useQuery } from 'react-query'
import ChatInterface from 'components/ChatInterface'
import VerifyEmail from 'components/VerifyEmail'
import OpenAIChatAPI from '../../api/OpenAIChatAPI'

const Chat = () => {
  const { user } = useUser({
    redirectTo: "/",
  })

  const openAIChat = useQuery({
    queryKey: ['openAIChat'],
    queryFn: () => OpenAIChatAPI.create({ model: "gpt-3.5-turbo" }),
    enabled: !!user,
  })

  const { data, isLoading } = openAIChat

  if (user && !user.isEmailVerified) {
    return <VerifyEmail />
  }

  if (isLoading || !data) {
    return <div />
  }

  return <ChatInterface chat={data}/>
}

export default Chat
