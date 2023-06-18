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
          >Already have an account?
          <RouterLink :to="{ name: 'login' }" class="underline" href="">Click here</RouterLink> to
          log in!</span
        >
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border-gray-200 rounded-lg">
        <form action="" class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="">Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your name"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
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
              v-model="form.password1"
              type="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="">Repeat password</label>
            <input
              v-model="form.password2"
              type="password"
              placeholder="Confirm your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>
          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ApiService from '@/services/ApiService'
import { useToastStore } from '@/stores/toastStore'
import { ref } from 'vue'

const toastStore = useToastStore()

const form = ref({
  email: '',
  name: '',
  password1: '',
  password2: ''
})

const errors = ref<string[]>([])

async function submitForm() {
  errors.value = []

  if (form.value.name === '') errors.value.push('Your name is missing')
  if (form.value.email === '') errors.value.push('Your email is missing')
  if (form.value.password1 === '') errors.value.push('Your password is missing')
  if (form.value.password1 !== form.value.password2)
    errors.value.push('Your password does not match')
  if (errors.value.length === 0) {
    try {
      const response = await ApiService.post('/api/signup/', { data: form })
      console.log(response)

      if (response.data.status === 'success') {
        toastStore.showToast(5000, 'The user is registered. Please log in', 'bg-emerald-500')
        resetForm()
      } else {
        toastStore.showToast(5000, 'Something went wrong. Please try again', 'bg-red-500')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

function resetForm() {
  form.value = {
    email: '',
    name: '',
    password1: '',
    password2: ''
  }
  errors.value = []
}
</script>
<style scoped></style>
