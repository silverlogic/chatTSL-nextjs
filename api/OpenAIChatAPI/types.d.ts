interface IOpenAIChatCreate {
  model: string
}

interface IOpenAIChat {
  id: number,
  user: number,
  model: string
  messages: IOpenAIChatMessages
}