import axios, { apiBaseURL } from '../axios'

const baseURL = `${apiBaseURL}/chatbot/open-ai`

export default class OpenAIChatAPI {
  static create(data: IOpenAIChatCreate): Promise<IOpenAIChat> {
    return axios.post(`${baseURL}`, data)
  }

  static get(id: number): Promise<IOpenAIChat> {
    return axios.get(`${baseURL}/${id}`)
  }

  static update(chatId: number, data: IOpenAIChatUpdate): Promise<IOpenAIChat> {
    return axios.patch(`${baseURL}/${chatId}`, data)
  }
}
