interface IOpenAIChatCreate {
  model: string
}

interface IOpenAIChatUpdate {
  model?: string
  tettraPageCategoryFilter?: number | null
  tettraPageSubcategoryFilter?: number | null
}

interface IOpenAIChat {
  id: number,
  user: number,
  model: string
  messages: IOpenAIChatMessages
  tettraPageCategoryFilter: ITettraPageCategory | null
  tettraPageSubcategoryFilter: ITettraPageSubcategory | null
}