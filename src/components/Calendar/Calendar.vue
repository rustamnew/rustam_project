<script setup>
    
    import { ref } from 'vue';
    import CalendarSide from './CalendarSide.vue';
    const date = ref(new Date());
    
</script>

<script>
    export default {
        methods: {
            onDrop(e) {
                if (e.target.classList.contains('vc-day')) {
                    console.log(e.target)
                }
            },
            onDragOver(e) {
                e.preventDefault();
            },
            initCalendarCells() {
                let cells = document.querySelectorAll('.vc-day:not(.inited)')
                cells.forEach( (cell) => {
                    let cell_inner = document.createElement('div')
                    cell_inner.classList.add('cell_inner')

                    //test item1
                    let item = document.createElement('div')
                    item.classList.add('item')

                    let name = document.createElement('div')
                    name.classList.add('name')
                    name.innerHTML = 'Сигареты'
                    
                    let price = document.createElement('div')
                    price.classList.add('price')
                    price.innerHTML = '150р'

                    item.append(name)
                    item.append(price)



                    //test item2
                    let item2 = document.createElement('div')
                    item2.classList.add('item')

                    let name2 = document.createElement('div')
                    name2.classList.add('name')
                    name2.innerHTML = 'Корм влаж.'
                    
                    let price2 = document.createElement('div')
                    price2.classList.add('price')
                    price2.innerHTML = '100р'

                    item2.style.backgroundColor='purple'
                    item2.style.color='white'

                    item2.append(name2)
                    item2.append(price2)


                    cell_inner.append(item)
                    cell_inner.append(item2)
                    cell.append(cell_inner)
                    cell.classList.add('inited')
                })
            }
        },
        mounted() {
            setTimeout(this.initCalendarCells, 1) //Придумать как прицепиться к событию загрузки календаря v-calendar
        }
    }
</script>

<template>
    <div class="calendar">
        <div class="date-wrapper" 
        @dragover="onDragOver($event)"
        @drop="onDrop($event)">
            <VDatePicker class="date" expanded v-model="date" mode="date" />
        </div>

        <CalendarSide />
    </div>
    
</template>

<style scoped>
    
</style>
