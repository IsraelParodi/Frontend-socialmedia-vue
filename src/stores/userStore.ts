import ApiService from '@/services/ApiService'
import JwtService from '@/services/JwtService'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export interface User {
  isAuthenticated: boolean
  id: string
  name: string
  email: string
  access: string
  refresh: string
  isActive: boolean
  isStaff: boolean
  isSuperUser: boolean
}

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    user: {
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      access: null,
      refresh: null
    } as unknown as User
  }),

  actions: {
    initStore() {
      if (localStorage.getItem('user.access')) {
        this.user.access = localStorage.getItem('user.access') || ''
        this.user.refresh = localStorage.getItem('user.refresh') || ''
        this.user.id = localStorage.getItem('user.id') || ''
        this.user.name = localStorage.getItem('user.name') || ''
        this.user.email = localStorage.getItem('user.email') || ''
        this.user.isAuthenticated = true

        this.refreshToken()

        console.log('Initialized user: ', this.user)
      }
    },
    setToken(data: User) {
      console.log('Set token', data)
      this.user.access = data.access
      this.user.refresh = data.refresh
      this.user.isAuthenticated = true

      JwtService.saveToken(data.access)
      ApiService.setHeader()
      localStorage.setItem('user.refresh', data.refresh)
    },
    async refreshToken() {
      try {
        const refreshResponse: AxiosResponse<User> = await ApiService.post('/api/account/refresh', {
          data: {
            refresh: this.user.refresh
          }
        })

        this.user.access = refreshResponse.data.access

        JwtService.saveToken(refreshResponse.data.access)
        ApiService.setHeader()
      } catch (error) {
        console.log(error)
        this.removeToken()
      }
    },
    removeToken() {
      console.log('Remove token')
      this.user.access = ''
      this.user.refresh = ''
      this.user.id = ''
      this.user.name = ''
      this.user.email = ''
      this.user.isAuthenticated = false

      localStorage.removeItem('user.access')
      localStorage.removeItem('user.refresh')
      localStorage.removeItem('user.id')
      localStorage.removeItem('user.name')
      localStorage.removeItem('user.email')
    },
    setuserInfo(user: User) {
      console.log('Set user', user)
      this.user.id = user.id
      this.user.name = user.name
      this.user.email = user.email
      this.user.access = JwtService.getToken() || ''
      this.user.refresh = localStorage.getItem('user.refresh') || ''

      localStorage.setItem('user.id', user.id)
      localStorage.setItem('user.name', user.name)
      localStorage.setItem('user.email', user.email)

      console.log('User', this.user)
    }
  }
})
