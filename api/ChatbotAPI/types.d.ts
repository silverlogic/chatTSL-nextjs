interface IOpenAIChatCreate {
  model: string
}

interface IOpenAIChat {
  id: number,
  user: number,
  model: string
  messages: IOpenAIChatMessages
}

interface IOpenAIChatMessage {
  id: number,
  chat: number
  role: string
  content: string
}

type IOpenAIChatMessages = Array<IOpenAIChatMessage> | []
