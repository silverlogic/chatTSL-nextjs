import { useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { ButtonWithLoading } from '@baseapp-frontend/design-system-mui'
import { IMessageFeedbackButtonProps } from './types'
import OpenAIChatMessageAPI from '../../../api/OpenAIChatMessageAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
} from '@fortawesome/free-regular-svg-icons'
import { ButtonContainer, Button, Icon } from './styled'

const AssistantChatMessageFeedback = ({
  chatMessage,
  onChatMessageUpdated,
  onError,
  ...props
}: IMessageFeedbackButtonProps) => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateChatMessage = async (rating: string) => {
    try {
      setIsLoading(true)
      const response = await OpenAIChatMessageAPI.update(chatMessage, { rating: rating })
      onChatMessageUpdated(response)
    } catch (error: unknown) {
      onError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ButtonContainer>
      <Button
        loading={isLoading}
        {...props}
        onClick={(e) => {
          e.stopPropagation()
          let nextRating = ''
          switch (chatMessage.rating) {
            case 'thumbs_up':
              nextRating = 'none'
              break
            default:
              nextRating = 'thumbs_up'
              break
          }
          updateChatMessage(nextRating)
        }}
      >
        <Icon
          icon={(function () {
            switch (chatMessage.rating) {
              case 'thumbs_up':
                return faThumbsUpSolid
              default:
                return faThumbsUpRegular
            }
          })()}
        />
      </Button>
      <Button
        loading={isLoading}
        {...props}
        onClick={(e) => {
          e.stopPropagation()
          let nextRating = ''
          switch (chatMessage.rating) {
            case 'thumbs_down':
              nextRating = 'none'
              break
            default:
              nextRating = 'thumbs_down'
              break
          }
          updateChatMessage(nextRating)
        }}
      >
        <Icon
          icon={(function () {
            switch (chatMessage.rating) {
              case 'thumbs_down':
                return faThumbsDownSolid
              default:
                return faThumbsDownRegular
            }
          })()}
        />
      </Button>
    </ButtonContainer>
  )
}

export default AssistantChatMessageFeedback
