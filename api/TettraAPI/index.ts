import axios, { apiBaseURL } from '../axios'
import humps from 'humps'

export class TettraCategoriesAPI {
  static baseURL = `${apiBaseURL}/tettra/categories`

  static list(): Promise<[ITettraPageCategory]> {
    return axios.get(`${TettraCategoriesAPI.baseURL}`, {})
  }
}

export class TettraSubcategoriesAPI {
  static baseURL = `${apiBaseURL}/tettra/subcategories`

  static list(params?: ITettraPageSubcategoryFilter): Promise<[ITettraPageSubcategory]> {
    params = humps.decamelizeKeys(params ?? {})
    return axios.get(`${TettraSubcategoriesAPI.baseURL}`, { params })
  }
}
