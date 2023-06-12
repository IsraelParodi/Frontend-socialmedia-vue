<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBarVue from './components/layout/NavBar.vue'
</script>

<template>
  <NavBarVue name="DjangoNetwork" />
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>
</template>

<style scoped></style>
