import ApiService from '@/services/ApiService'
import JwtService from '@/services/JwtService'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

interface User {
  isAuthenticated: boolean
  id: any
  name: any
  email: any
  access: any
  refresh: any
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
      if (localStorage.getItem('user.acess')) {
        this.user.access = localStorage.getItem('user.access')
        this.user.refresh = localStorage.getItem('user.refresh')
        this.user.id = localStorage.getItem('user.id')
        this.user.name = localStorage.getItem('user.name')
        this.user.email = localStorage.getItem('user.email')
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

      localStorage.setItem('user.access', data.access)
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
      this.user.access = null
      this.user.refresh = null
      this.user.id = null
      this.user.name = null
      this.user.email = null
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

      localStorage.setItem('user.id', user.id)
      localStorage.setItem('user.name', user.name)
      localStorage.setItem('user.email', user.email)

      console.log('User', this.user)
    }
  }
})
