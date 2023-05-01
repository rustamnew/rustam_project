<script setup>
    
    import { ref } from 'vue';
    import CalendarSide from './CalendarSide.vue';
    const date = ref(new Date());
    
</script>

<template>
    <div class="calendar">
        <div class="date-wrapper">
            <VDatePicker class="date" expanded v-model="date" mode="date" />
        </div>

        <CalendarSide />

        
        
    </div>
    
</template>

<style scoped>
    
</style>
