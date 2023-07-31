import axios, { apiBaseURL } from '../axios'

const baseURL = `${apiBaseURL}/chatbot/open-ai-messages`

export default class OpenAIChatMessageAPI {
  static update(message: IOpenAIChatMessage, data: IOpenAIChatMessageUpdate): Promise<IOpenAIChatMessage> {
    return axios.patch(`${baseURL}/${message.id}`, data)
  }
}
