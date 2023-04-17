<script setup>
import AddDish from '../components/AddDish.vue'
import DishList from '../components/DishList.vue'
import DishBuyList from '../components/DishBuyList.vue'

import {useMainPagesStore} from '../stores/mainPages'

import PageSlider from '../components/PageSlider.vue'

const mainPageStore = useMainPagesStore();
</script>

<script>
export default {
  data() {
    return {
      //page: 0
      transition: 'right'
    }
  },
  methods: {
    
  }
}
</script>

<template>

  <transition name="listing">
    <AddDish v-if="mainPageStore.page == 0"/>
  </transition>

  <transition  name="listing">
    <DishList v-if="mainPageStore.page == 1"/>
  </transition>

  <transition name="listing">
    <DishBuyList v-if="mainPageStore.page == 2"/>
  </transition>
  

  <PageSlider/>
</template>

<style>

</style>
