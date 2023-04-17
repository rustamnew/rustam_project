<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useMainPagesStore} from '../stores/mainPages'

const mainPageStore = useMainPagesStore();
defineProps({
  /*msg: {
    type: String,
    required: true
  }*/
})
</script>

<template>
    <div class="pageNumber">{{ mainPageStore.page }}</div>
    <div class="pageSlider">
        <div class="line">

            <div class="item" @click="mainPageStore.pageSet(0)">0</div>
            <div class="item" @click="mainPageStore.pageSet(1)">1</div>
            <div class="item" @click="mainPageStore.pageSet(2)">2</div>
            <div class="item" @click="mainPageStore.pageSet(3)">3</div>
            
        </div>
    </div>
</template>

<style scoped>

</style>