<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AddDish from './components/AddDish.vue'
import DishList from './components/DishList.vue'
import DishBuyList from './components/DishBuyList.vue'
</script>

<template>


<!--
<nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
</nav>
-->

<RouterView />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

</style>
