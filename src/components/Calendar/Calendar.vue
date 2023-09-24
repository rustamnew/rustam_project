<script setup>
    
import { ref } from 'vue';
import CalendarSide from './CalendarSide.vue';
import {useCalendarDragStore} from '../../stores/calendarDrag';
import {useDataStore} from '../../stores/data';
//import {useDialogStore} from '../../stores/dialog';

const date = ref(new Date());

//const calendarDragStore = useCalendarDragStore()
</script>

<script>
    export default {
        data() {
            const dataStore = useDataStore()
            //const dialogStore = useDialogStore()
            return {
                remove: false,
                dataStore,
                wishes: []
            }
            
        },
        methods: {
            onDrop(e) {

                if (this.remove) {
                    if (e.target.classList.contains('remove-area')) {
                        
                    }
                } else {
                    let item;

                    if (!e.target.classList.contains('vc-day')) {
                        item = e.target.closest('.vc-day');
                    } else {
                        item = e.target;
                    }


                    if (item && item.classList.contains('inited')) {
                        this.addDraggedWishToDay(item);
                    } else if (!item) {
                        
                    } else {
                        console.log('day cell not inited, need to call the init function first');
                    }
                }

                /*if (e.srcElement.classList.contains('vc-day')) { // предотвращение бага
                    console.log(e)
                    return
                }
                if (e.srcElement.closest('.cell_inner')) { // если потянули из календаря
                    console.log(e)
                    return
                }*/


                
            },

            onDragOver(e) {
                e.preventDefault();
            },

            updateTotalSumms(day_cell = false) {
                let totals

                if (!day_cell) {
                    totals = document.querySelectorAll('.vc-day .total.toUpdate')
                } else {
                    totals = day_cell.querySelectorAll('.vc-day .total.toUpdate')
                }

                totals.forEach( (total) => {
                    if (total.closest('.cell_inner').querySelector('.wish-list').querySelectorAll('.item').length) {
                        let items = total.closest('.cell_inner').querySelector('.wish-list').querySelectorAll('.item')

                        let summ = 0;
                        items.forEach( (item) => {
                            let cost = Number(item.querySelector('.price').getAttribute('price_n'))

                            summ += cost
                        })

                        total.querySelector('.price').innerHTML = summ
                    }
                })
                
            },

            createTotalSummsLayout() {

            },

            initCalendar() {
                //Добавление зоны для удаления
                let wrap = document.querySelector('.vc-pane-container')
                let remove_area = document.createElement('div')
                remove_area.classList.add('remove-area')
                wrap.append(remove_area)


                //Инициализация ячеек календаря
                let cells = document.querySelectorAll('.vc-day:not(.inited)')
                cells.forEach( (cell) => {

                    let cell_inner = document.createElement('div')
                    cell_inner.classList.add('cell_inner')

                    let cell_inner_wish_list = document.createElement('div')
                    cell_inner_wish_list.classList.add('wish-list')

                    cell_inner.append(cell_inner_wish_list)


                    let cell_inner_total = document.createElement('div')
                    cell_inner_total.classList.add('total')
                    cell_inner_total.classList.add('toUpdate')

                    let cell_inner_total_title = document.createElement('div')
                    cell_inner_total_title.classList.add('title')
                    cell_inner_total_title.innerHTML = 'Всего'

                    
                    let cell_inner_total_price = document.createElement('div')
                    cell_inner_total_price.classList.add('price')

                    cell_inner_total.append(cell_inner_total_title)
                    cell_inner_total.append(cell_inner_total_price)

                    cell_inner.append(cell_inner_total)

                    cell.append(cell_inner)
                    cell.classList.add('inited')
                })


                this.loadData();
            },

            loadData() {
                this.wishes = this.dataStore.getData('all', 'calendar')
            },

            //  Вывод Wish, на вход объект, день находится автоматически  //
            addObjWish(day_wish_obj) {
                day_wish_obj[1].forEach( (wish_obj_item) => {
                    let day_cell = document.querySelector(`.id-${wish_obj_item.date}`)

                    let item = document.createElement('div');
                    let name = document.createElement('div');
                    let price = document.createElement('div');

                    item.classList.add('item');
                    name.classList.add('name');
                    price.classList.add('price');

                    name.innerHTML = wish_obj_item.name;
                    price.setAttribute('price_n', wish_obj_item.price)
                    price.innerHTML = wish_obj_item.price

                    item.style.backgroundColor = wish_obj_item.color;
                    item.setAttribute('buy-item-id', wish_obj_item.id)

                    item.draggable = true
                    item.addEventListener('dragstart', (e) => {
                        this.remove = true
                        this.showRemoveArea()
                        console.log(e)
                    })
                    item.addEventListener('dragend', (e) => {
                        this.remove = false
                        this.hideRemoveArea()
                        console.log(e)
                    })
                    item.addEventListener('startdrag', this.showRemoveArea)

                    item.append(name);
                    item.append(price);

                    day_cell.querySelector('.wish-list').append(item);
                })
                
            },

            //  Добавление перетянутого Wish (drag&drop) //
            addDraggedWishToDay(day_cell) {
                const calendarDragStore = useCalendarDragStore()

                let item = document.createElement('div');
                let name = document.createElement('div');
                let price = document.createElement('div');

                item.classList.add('item');
                name.classList.add('name');
                price.classList.add('price');

                name.innerHTML = calendarDragStore.dragObj.name;
                price.setAttribute('price_n', calendarDragStore.dragObj.price)
                price.innerHTML = calendarDragStore.dragObj.price

                item.style.backgroundColor = calendarDragStore.dragObj.color;
                item.setAttribute('item_id', calendarDragStore.dragObj.id)


                item.draggable = true
                item.addEventListener('dragstart', (e) => {
                    this.remove = true
                    this.showRemoveArea()
                    console.log(e)
                })
                item.addEventListener('dragend', (e) => {
                    this.remove = false
                    this.hideRemoveArea()
                    console.log(e)
                })
                item.addEventListener('startdrag', this.showRemoveArea)

                item.append(name);
                item.append(price);

                day_cell.querySelector('.wish-list').append(item);

                this.updateTotalSumms(day_cell)


                let date = day_cell.classList[1].split('id-').pop();

                let obj = {
                    id: calendarDragStore.dragObj.id,
                    name: calendarDragStore.dragObj.name,
                    price: calendarDragStore.dragObj.price,
                    type: 'needs',
                    color: calendarDragStore.dragObj.color,
                    date: date
                }


                this.dataStore.saveData(obj, 'calendar', date)

                //Сохранение в cookie/localstorage
                //Отправка запроса на сохранение
            },

            onMounted() {
                this.initCalendar();
                console.log(this.wishes)
                //this.wishes.forEach( (wish_obj_item) => {
                Object.entries(this.wishes).forEach( (date) => {
                    let day_objects = this.wishes[date[0]]
                    Object.entries(day_objects).forEach( (obj) => {
                        console.log(obj)
                        this.addObjWish(obj)
                    })
                    
                })
                this.updateTotalSumms();
                
            },

            showRemoveArea() {
                document.querySelector('.remove-area').classList.add('active')
            },
            hideRemoveArea() {
                document.querySelector('.remove-area').classList.remove('active')
            },

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
