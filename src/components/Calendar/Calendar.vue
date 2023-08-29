<script setup>
    
    import { ref } from 'vue';
    import CalendarSide from './CalendarSide.vue';
    import {useCalendarDragStore} from '../../stores/calendarDrag';

    const date = ref(new Date());

    //const calendarDragStore = useCalendarDragStore()
</script>

<script>
    export default {
        data() {
            return {
                wishes: [
                    {
                        date: '2023-08-04',
                        wish: {
                            name: 'Еда1',
                            price: '150р',
                            color: 'gray'
                        }
                    },
                    {
                        date: '2023-08-04',
                        wish: {
                            name: 'Еда2',
                            price: '120р',
                            color: 'purple'
                        }
                    },
                    {
                        date: '2023-08-04',
                        wish: {
                            name: 'Еда3',
                            price: '100р',
                            color: 'green',
                        }
                    },
                ]
            }
            
        },
        methods: {
            onDrop(e) {
                let item;

                if (!e.target.classList.contains('vc-day')) {
                    item = e.target.closest('.vc-day');
                } else {
                    item = e.target;
                }
                if (item.classList.contains('inited')) {
                    this.addDraggedWishToDay(item);
                } else {
                    console.log('day cell not inited, need to call the init function first');
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

                    cell.append(cell_inner)
                    cell.classList.add('inited')
                })
            },

            addObjWish(wish_obj_item) {
                let day_cell = document.querySelector(`.id-${wish_obj_item.date}`)

                let item = document.createElement('div');
                let name = document.createElement('div');
                let price = document.createElement('div');

                item.classList.add('item');
                name.classList.add('name');
                price.classList.add('price');
                
                name.innerHTML = wish_obj_item.wish.name;
                price.innerHTML = wish_obj_item.wish.price;

                item.style.backgroundColor = wish_obj_item.wish.color;

                item.append(name);
                item.append(price);

                day_cell.querySelector('.cell_inner').append(item);
            },
            addDraggedWishToDay(day_cell) {
                const calendarDragStore = useCalendarDragStore()

                let item = document.createElement('div');
                let name = document.createElement('div');
                let price = document.createElement('div');

                item.classList.add('item');
                name.classList.add('name');
                price.classList.add('price');

                name.innerHTML = calendarDragStore.dragObj.name;
                price.innerHTML = calendarDragStore.dragObj.price;

                item.style.backgroundColor = calendarDragStore.dragObj.color;

                item.append(name);
                item.append(price);

                day_cell.querySelector('.cell_inner').append(item);

                //Сохранение в cookie/localstorage
                //Отправка запроса на сохранение
            },

            onMounted() {
                this.initCalendarCells();
                this.wishes.forEach( (wish_obj_item) => {
                    this.addObjWish(wish_obj_item)
                })
                
            }

        },

        mounted() {
            setTimeout(this.onMounted, 1); //Придумать как прицепиться к событию загрузки календаря v-calendar
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
