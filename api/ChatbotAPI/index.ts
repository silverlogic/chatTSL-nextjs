import axios, { apiBaseURL } from '../axios'

const baseURL = `${apiBaseURL}/chatbot/open-ai`

export default class ChatbotAPI {
  static create(data: IOpenAIChatCreate): Promise<IOpenAIChat> {
    return axios.post(`${baseURL}`, data)
  }

  static get(id: number): Promise<IOpenAIChat> {
    return axios.get(`${baseURL}/${id}`)
  }
}
