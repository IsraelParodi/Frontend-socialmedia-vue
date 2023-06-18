<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Login</h1>
        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fugiat, enim cupiditate
          voluptas placeat eaque itaque explicabo maiores numquam nisi consectetur hic velit
          deserunt, amet praesentium porro voluptatem dolorum qui.
        </p>
        <span class="font-bold"
          >Don't have an account?
          <RouterLink :to="{ name: 'signup' }" class="underline" href="">Click here</RouterLink> to
          create one!</span
        >
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border-gray-200 rounded-lg">
        <form action="" class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Your email address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>
          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { router } from '@/router'
import ApiService from '@/services/ApiService'
import JwtService from '@/services/JwtService'
import { useToastStore } from '@/stores/toastStore'
import { useUserStore } from '@/stores/userStore'
import { reactive, ref } from 'vue'

const userStore = useUserStore()
const toastStore = useToastStore()

let form = reactive({
  email: '',
  password: ''
})

const errors = ref<string[]>([])

async function submitForm() {
  errors.value = []

  if (form.email === '') errors.value.push('Your email is missing')
  if (form.password === '') errors.value.push('Your password is missing')

  if (errors.value.length === 0) {
    try {
      const response = await ApiService.post('/api/login/', form)
      JwtService.saveToken(response.data.access)
      JwtService.saveTokenRefresh(response.data.refresh)
      ApiService.setHeader()
      if (response.status === 200) {
        const userLogged = await ApiService.get('/api/me')
        userStore.setuserInfo(userLogged.data)
        resetForm()
        router.push('/feed')
      } else {
        toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-500')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

function resetForm() {
  form = {
    email: '',
    password: ''
  }
  errors.value = []
}
</script>
<style scoped></style>
