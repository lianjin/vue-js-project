<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
</script>

<template>
  <h1>{{ message }}</h1>
  <input v-model="message" />
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>