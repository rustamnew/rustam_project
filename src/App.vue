<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { register } from 'swiper/element/bundle';

register();
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
