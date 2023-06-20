import { Box, Typography } from '@mui/material'
import { useUser } from '@baseapp-frontend/core'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import {
  ChatInterfaceContainer,
  MessageContainer,
  MessageContentContainer,
  WSConnectionStateText,
} from './styled'
import Input from './Input'
import { IChatInterfaceProps } from './types'
import LoadingDots from './LoadingDots'
import SystemMessage from './SystemMessage'
import useWebSocket, { Options, ReadyState } from 'react-use-websocket'
import Cookies from 'js-cookie'
import humps from 'humps'
import _ from 'lodash'
import useNotifications from '../../hooks/useNotifications'
import { formatApiErrorMessages } from '../../utils/ErrorUtils'

export const websocketsApiBaseURL = process.env.NEXT_PUBLIC_API_WEBSOCKET_BASE_URL

import { IUser, IUserContext } from '@baseapp-frontend/core'

interface IUserProfile extends IUser {
  avatar: {
    fullSize: string
  }
}

export interface IUseUserProfile extends IUserContext {
  user: IUserProfile
}

const ChatInterface = ({ chat }: IChatInterfaceProps) => {
  const { user, isLoading } = useUser() as IUseUserProfile
  const notifications = useNotifications()

  const [chatMessages, setChatMessages] = useState<IOpenAIChatMessages>([])
  const [isWaitingForChatbot, setisWaitingForChatbot] = useState<boolean>(false)

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

  const defaultOptions: Options = {
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 5000,
    retryOnError: true,
    protocols: [],
  }

  const authToken = Cookies.get('Authorization')
  if (authToken) {
    defaultOptions.protocols = [...defaultOptions.protocols as string[], 'Authorization', authToken]
  }

  const [socketUrl, setSocketUrl] = useState(`${websocketsApiBaseURL}/chat/${chat.id}/`)
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onClose: (event) => {
      console.log('onClose', event)
      setisWaitingForChatbot(false)
    },
    onMessage(event) {
      console.log('onMessage', event)
      try {
        const jsonData = humps.camelizeKeys(JSON.parse(event.data))
        const eventType = _.get(jsonData, 'eventType')
        const eventData = _.get(jsonData, 'eventData', {})
        if (!_.isString(eventType)) {
          console.warn('Failed to handle websocket event: ', jsonData)
          return
        }
        switch (eventType) {
          case 'PONG':
            console.info(eventType)
            break
          case 'on_message_created':
            const chatMessage = eventData as IOpenAIChatMessage
            setChatMessages([...chatMessages, chatMessage])
            switch (chatMessage.role) {
              case 'user':
                setisWaitingForChatbot(true)
                break
              default:
                setisWaitingForChatbot(false)
                break
            }
            break
          case 'on_error':
            console.error('websocket event error: ', jsonData)
            const errorMessages = formatApiErrorMessages(eventData)
            notifications.showMessage(errorMessages.join('\n\n'), 'error')
            break
          default:
            console.warn('Failed to handle websocket event: ', jsonData)
        }
      } catch (error) {
        console.error(error)
        setisWaitingForChatbot(false)
        return null
      }
    },
    onError: (event) => {
      console.error('onError', event)
      notifications.showError(event)
    },
    ...defaultOptions,
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      sendPing()
    }
  }, [readyState, chat])

  const sendEvent = (eventType: string, eventData: object) => {
    sendMessage(JSON.stringify(humps.decamelizeKeys({
      eventType: eventType,
      eventData: eventData
    })))
  }

  const sendPing = () => {
    sendEvent('PING', {})
  }

  const sendChatMessage = (text: string) => {
    sendEvent('create_message', {
      content: text,
    })
  }

  const allChatMessages = [...chat.messages, ...chatMessages]

  return (
    <ChatInterfaceContainer>
      <WSConnectionStateText>WS Connection: {connectionStatus}</WSConnectionStateText>
      <Box sx={{ overflow: 'auto', paddingBottom: '9rem' }} ref={boxRef}>
        {allChatMessages.map((chatMessage, index: number) => (
          <MessageContainer isUserQuestion={chatMessage.role == 'user'} key={index}>
            <MessageContentContainer>
              {(() => {
                switch (chatMessage.role) {
                  case 'system':
                    return <SystemMessage response={chatMessage.content} />
                  case 'user':
                    return (
                      <>
                        <Box sx={{ flexShrink: 0 }}>
                          <Image
                            width="48px"
                            height="48px"
                            src={user.avatar.fullSize}
                            alt="avatar"
                            style={{ borderRadius: '50%' }}
                          />
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: '12px' }}>
                          {chatMessage.content}
                        </Typography>
                      </>
                    )
                  case 'assistant':
                    return (
                      // TOOD: Implement animated messages with HTML formatting
                      // <AssistantMessage
                      //   animated={index === allChatMessages.length - 1}
                      //   response={chatMessage.content}
                      // />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: chatMessage.content,
                        }}
                      />
                    )
                  default:
                    return null
                }
              })()}
            </MessageContentContainer>
          </MessageContainer>
        ))}
        {isWaitingForChatbot && (
          <MessageContainer isUserQuestion={false} key={Number.MAX_SAFE_INTEGER}>
            <MessageContentContainer>
              <LoadingDots />
            </MessageContentContainer>
          </MessageContainer>
        )}
      </Box>
      <Input
        onSubmit={(text) => sendChatMessage(text)}
        isLoading={isWaitingForChatbot}
        disabled={readyState != ReadyState.OPEN}
      />
    </ChatInterfaceContainer>
  )
}

export default ChatInterface
