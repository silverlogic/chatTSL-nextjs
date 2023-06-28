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
  tettraPages: Array<IOpenAIChatMessageTettraPage> | []
}


interface IOpenAIChatMessageTettraPage {
  id: number,
  pageId: number,
  pageTitle: string
  ownerId: number
  ownerName: string
  url: string
  categoryId: number,
  categoryName: string
  subcategoryId: number,
  subcategoryName: string
}

type IOpenAIChatMessages = Array<IOpenAIChatMessage> | []
