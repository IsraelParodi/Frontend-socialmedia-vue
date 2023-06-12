<script setup lang="ts"></script>
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
        <form action="" class="space-y-6">
          <div>
            <label for="">Email</label>
            <input
              type="email"
              placeholder="Your email address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="">Password</label>
            <input
              type="email"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Log in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
