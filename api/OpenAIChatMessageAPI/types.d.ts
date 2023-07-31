interface IOpenAIChatMessage {
  id: number,
  chat: number
  role: string
  content: string
  tettraPages: Array<IOpenAIChatMessageTettraPage> | []
  rating: string
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

interface IOpenAIChatMessageUpdate {
  rating: string
}
