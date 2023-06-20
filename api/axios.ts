import { axios as baseappAxios } from '@baseapp-frontend/core'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'
import _ from 'lodash'

export const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const ejectAllInterceptors = (instance: any, interceptorType: 'request' | 'response') => {
  // Ideally we should be able to eject each interceptor handler by its ID,
  // but we don't save them on baseapp so we just iterate on them.
  ;((instance.interceptors[interceptorType] as any).handlers ?? []).forEach(
    (_: any, index: number) => {
      instance.interceptors[interceptorType].eject(index)
    },
  )
}

const requestInterceptor = (request: any) => {
  const authToken = Cookies.get('Authorization')
  if (authToken && request.headers && !request.headers.Authorization) {
    request.headers.Authorization = `Token ${authToken}`
  }

  const locale = Cookies.get('language')
  if (locale && request.headers) {
    request.headers['Accept-Language'] = locale
  }

  if (request.data) {
    if (request.headers?.['Content-Type'] === 'multipart/form-data') {
      const formData = new FormData()
      _.forEach(request.data, (value, key) => {
        if ((!(value instanceof File) || !(value instanceof Blob)) && typeof value == 'object') {
          value = JSON.stringify(value)
        }
        formData.append(humps.decamelize(key), value)
      })
      request.data = formData
    } else {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }
  }
  return request
}

ejectAllInterceptors(baseappAxios, 'request')
baseappAxios.interceptors.request.use(requestInterceptor)

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.patch['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'
instance.defaults.headers.delete['Content-Type'] = 'application/json'

instance.interceptors.request.use(requestInterceptor)
instance.interceptors.response.use((response) => {
  if (response.data && response.headers['content-type'] === 'application/json') {
    return humps.camelizeKeys(response.data)
  }
  return response.data
})

export default instance
