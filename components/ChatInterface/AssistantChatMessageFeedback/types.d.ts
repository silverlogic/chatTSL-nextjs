import { IButtonWitthLoadingProps } from '@baseapp-frontend/design-system-mui'

interface IMessageFeedbackButtonProps extends IButtonWitthLoadingProps {
  chatMessage: IOpenAIChatMessage,
  onChatMessageUpdated: (chatMessage: IOpenAIChatMessage) => void
  onError: (error: unknown) => void
}