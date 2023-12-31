import { type App } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import JwtService from './JwtService'

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app
    ApiService.vueInstance.use(VueAxios, axios)
    ApiService.setHeader()
    ApiService.vueInstance.axios.defaults.baseURL = 'http://localhost:8000'
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getToken()}`
    ApiService.vueInstance.axios.defaults.headers.common['Accept'] = 'application/json'
    ApiService.vueInstance.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params)
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string, slug = '' as string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`)
  }

  public static all(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}`)
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: unknown): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params, {
      headers: {
        // Use the commented line if you want to wrap your params with a key called data
        // 'Content-Type': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  public static postAuth(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`)
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params)
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params)
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}`, params)
  }
}

export default ApiService
