import Link from 'next/link'
import { Box, SvgIconProps, Typography, useTheme } from '@mui/material'
import { useUser } from '@baseapp-frontend/core'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ChatInterfaceContainer,
  ChatInterfaceContentContainer,
  ChatInterfaceContent,
  NoDataContainer,
  MessageContainer,
  MessageContentContainer,
  MessageInnerContentContainer,
  WSConnectionStateContainer,
  WSConnectionStateIndicatorDot,
  TettraPagesContainer,
  TettraPage,
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
import { IUser, IUserContext } from '@baseapp-frontend/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import AssistantChatMessageFeedback from './AssistantChatMessageFeedback'
import LogoIcon from '../Icons/LogoIcon'
import useMutationObserver from '../../hooks/useMutationObserver'
import Sidebar from './Sidebar'
import OpenAIChatAPI from '../../api/OpenAIChatAPI'
import { CircularProgress } from './styled'

export const websocketsApiBaseURL = process.env.NEXT_PUBLIC_API_WEBSOCKET_BASE_URL

interface IUserProfile extends IUser {
  avatar: {
    fullSize: string
  }
}

export interface IUseUserProfile extends IUserContext {
  user: IUserProfile
}

const ChatInterface = ({ chat, onChatUpdated }: IChatInterfaceProps) => {
  const { user } = useUser() as IUseUserProfile
  const theme = useTheme()
  const notifications = useNotifications()

  const [chatMessages, setChatMessages] = useState<IOpenAIChatMessages>([])
  const [allChatMessages, setAllChatMessages] = useState<IOpenAIChatMessages>([])
  const [isWaitingForChatbot, setisWaitingForChatbot] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<ITettraPageCategory | null>(
    chat.tettraPageCategoryFilter,
  )
  const [selectedSubcategory, setSelectedSubcategory] = useState<ITettraPageSubcategory | null>(
    chat.tettraPageSubcategoryFilter,
  )
  const [isUpdatingChat, setIsUpdatingChat] = useState<boolean>(false)

  const boxRef = useRef<HTMLDivElement | null>(null)
  const autoScrollEnabledRef = useRef<boolean>(true)

  const onBoxRefMutation = useCallback(() => {
    if (boxRef.current) {
      if (!autoScrollEnabledRef.current) {
        return
      }
      if (boxRef.current) {
        boxRef.current.scrollTop = boxRef.current.scrollHeight
      }
    }
  }, [autoScrollEnabledRef])

  useMutationObserver(boxRef.current, onBoxRefMutation)

  const defaultOptions: Options = {
    shouldReconnect: () => true,
    reconnectAttempts: Infinity,
    reconnectInterval: 5000,
    retryOnError: true,
    protocols: [],
  }

  const authToken = Cookies.get('Authorization')
  if (authToken) {
    defaultOptions.protocols = [
      ...(defaultOptions.protocols as string[]),
      'Authorization',
      authToken,
    ]
  }

  const [socketUrl] = useState(`${websocketsApiBaseURL}/chat/${chat.id}/`)
  const { sendMessage, readyState } = useWebSocket(socketUrl, {
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
            autoScrollEnabledRef.current = true
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
            setisWaitingForChatbot(false)
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
      setisWaitingForChatbot(false)
      notifications.showError(event)
    },
    ...defaultOptions,
  })

  useEffect(() => {
    if (readyState == ReadyState.OPEN) {
      sendPing()
    }
  }, [readyState])

  const sendEvent = (eventType: string, eventData: object) => {
    sendMessage(
      JSON.stringify(
        humps.decamelizeKeys({
          eventType: eventType,
          eventData: eventData,
        }),
      ),
    )
  }

  const sendPing = () => {
    sendEvent('PING', {})
  }

  const sendChatMessage = (text: string) => {
    setisWaitingForChatbot(true)
    sendEvent('create_message', {
      content: text,
    })
  }

  useEffect(() => {
    setAllChatMessages([...chat.messages, ...chatMessages])
  }, [chat, chatMessages])

  const updateChat = async (update: IOpenAIChatUpdate) => {
    try {
      setIsUpdatingChat(true)
      const updatedChat = await OpenAIChatAPI.update(chat.id, update)
      onChatUpdated(updatedChat)
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdatingChat(false)
    }
  }

  return (
    <ChatInterfaceContainer>
      <WSConnectionStateContainer>
        {isUpdatingChat && <CircularProgress size={theme.spacing(1.5)} />}
        {(() => {
          const _iconProps: SvgIconProps = {}
          switch (readyState) {
            case (ReadyState.UNINSTANTIATED, ReadyState.CLOSED):
              _iconProps['htmlColor'] = '#FF3131' // red
              break
            case (ReadyState.CONNECTING, ReadyState.CLOSING):
              _iconProps['htmlColor'] = '#FFEA00' // yellow
              break
            case ReadyState.OPEN:
              _iconProps['htmlColor'] = '#0FFF50' // green
              break
            default:
              _iconProps['htmlColor'] = '#FF3131' // red
          }
          return <WSConnectionStateIndicatorDot {..._iconProps} />
        })()}
      </WSConnectionStateContainer>
      <ChatInterfaceContentContainer>
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChanged={(category: ITettraPageCategory | null) => {
            setSelectedCategory(category)
            if (chat.tettraPageCategoryFilter?.id != category?.id) {
              updateChat({ tettraPageCategoryFilter: category?.id || null })
            }
          }}
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChanged={(subcategory: ITettraPageSubcategory | null) => {
            setSelectedSubcategory(subcategory)
            if (chat.tettraPageSubcategoryFilter?.id != subcategory?.id) {
              updateChat({ tettraPageSubcategoryFilter: subcategory?.id || null })
            }
          }}
        ></Sidebar>
        <ChatInterfaceContent>
          {_.isEmpty(allChatMessages) ? (
            <NoDataContainer>
              <LogoIcon />
            </NoDataContainer>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                overflowX: 'auto',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: 0
                },
              }}
              ref={boxRef}
              onScroll={(e) => {
                const target = e.target as HTMLInputElement
                const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight
                autoScrollEnabledRef.current = isAtBottom
              }}
            >
              {allChatMessages.map((chatMessage, index: number) => (
                <MessageContainer isUserQuestion={chatMessage.role == 'user'} key={index}>
                  <MessageContentContainer>
                    <MessageInnerContentContainer>
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
                                    src={user?.avatar?.fullSize}
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
                              <>
                                <Box
                                  component={'div'}
                                  sx={{
                                    flexGrow: 1,
                                    '& a': { color: '#14AEEA' },
                                  }}
                                >
                                  <ReactMarkdown>{chatMessage.content}</ReactMarkdown>
                                </Box>
                              </>
                            )
                          default:
                            return null
                        }
                      })()}
                      {chatMessage.role == 'assistant' && (
                        <AssistantChatMessageFeedback
                          chatMessage={chatMessage}
                          onChatMessageUpdated={(_chatMessage: IOpenAIChatMessage) => {
                            setChatMessages((prevChatMessages) =>
                              prevChatMessages.map((message) =>
                                message.id === _chatMessage.id ? _chatMessage : message,
                              ),
                            )
                          }}
                          onError={(error: unknown) => {
                            notifications.showError(error)
                          }}
                        />
                      )}
                    </MessageInnerContentContainer>
                    {!_.isEmpty(chatMessage.tettraPages) && (
                      <TettraPagesContainer>
                        <Typography variant="subtitle2">Learn More:</Typography>
                        {chatMessage.tettraPages.map((tettraPage, index: number) => (
                          <Link href={tettraPage.url} key={index}>
                            <a
                              rel="noopener noreferrer"
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <TettraPage key={index}>
                                <Typography variant="subtitle2">{tettraPage.pageTitle}</Typography>
                                <FontAwesomeIcon
                                  icon={faExternalLink}
                                  style={{ fontSize: 14, color: theme.palette.surface[50] }}
                                />
                              </TettraPage>
                            </a>
                          </Link>
                        ))}
                      </TettraPagesContainer>
                    )}
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
          )}
          <Input
            onSubmit={(text) => sendChatMessage(text)}
            isLoading={isWaitingForChatbot}
            disabled={readyState != ReadyState.OPEN}
          />
        </ChatInterfaceContent>
      </ChatInterfaceContentContainer>
    </ChatInterfaceContainer>
  )
}

export default ChatInterface
