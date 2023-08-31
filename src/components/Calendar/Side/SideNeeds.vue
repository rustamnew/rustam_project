<script setup>

import {useCalendarDragStore} from '../../../stores/calendarDrag';

</script>

<template>
    <div class="needs-wrapper">
        <div class="needs">
            <h3>Потребности</h3>

            <div class="needs-list">
                
                <template v-for="item in items" :key="item.name">
                    <div class="needs-item" :style="{
                        backgroundColor: item.color,
                        color: '#fff'
                    }" 
                    @dragstart="startDrag($event, item)"
                    @drop="dropDrag($event, item)"
                    @dragend="endDrag($event, item)"
                    draggable="true">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">{{ item.price }}</div>
                    </div>
                </template>

        
            </div>

            <div class="needs-add">
                <button class="button"
                @click="addNeeds()">Добавить</button>

                <div class="inputs" v-if="showAddButtons">
                    <input class="input" type="text" name="add-needs-name" placeholder="Название" @keyup="inputsCheck()">
                    <input class="input" type="number" name="add-needs-price" placeholder="Стоимость" @keyup="inputsCheck()">

                    <button class="check-submit" :class="{active: activeCheckSumbit}" @click="needsAddSubmit()">
                        <img src="../../../assets/images/icons/check-icon.svg" alt="Готово">
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>
    export default {
        data() {
            return {
                showAddButtons: false,
                activeCheckSumbit: false,
                items: [
                    {
                        id: 0,
                        name: 'Еда1',
                        type: 'needs',
                        price: '1500',
                        color: 'red'
                    },
                    {
                        id: 1,
                        name: 'Еда2',
                        type: 'needs',
                        price: '1500',
                        color: 'green'
                    },
                    {
                        id: 2,
                        name: 'Еда3',
                        type: 'needs',
                        price: '1500',
                        color: 'blue'
                    },
                ]
            }
        },
        methods: {
            startDrag(e, item) {

                e.target.classList.add('dragging')

                let created_obj = {}
                created_obj.id = item.id
                created_obj.color = item.color
                created_obj.name = item.name
                created_obj.price = item.price
                created_obj.type = item.type

                const calendarDragStore = useCalendarDragStore()
                calendarDragStore.dragObjSet(created_obj)
            },

            addNeeds() {
                this.showAddButtons = true

                setTimeout(() => {
                    document.querySelector('[name=add-needs-name]').focus()
                }, 1);
                
            },
            
            needsAddSubmit() {
                let name_input = document.querySelector('input[name=add-needs-name]')
                let price_input = document.querySelector('input[name=add-needs-price]')

                let name = name_input.value
                let price = price_input.value

                //Найти максимальный id (временно)
                let max_id = 0
                this.items.map( (obj) => {
                    console.log(obj.id)
                    if (obj.id > max_id) {
                        max_id = obj.id
                    }
                })

                let obj = {
                    id: max_id,
                    name: name,
                    price: price,
                    type: 'needs',
                    color: 'lightgray'
                }

                this.items.push(obj)

                

                //Закрытие и очистка полей
                this.showAddButtons = false;
                this.activeCheckSumbit = false;
                name_input.value = '';
                price_input.value = '';
            },

            inputsCheck() {
                let name_input = document.querySelector('input[name=add-needs-name]')
                let price_input = document.querySelector('input[name=add-needs-price]')

                if (name_input.value && price_input.value) {
                    this.activeCheckSumbit = true
                } else {
                    this.activeCheckSumbit = false
                }
            },


            endDrag(e, list) {
                //console.log(e)
                //console.log(list)
            },
            dropDrag(e, item) {
                //console.log(e)
                //console.log(item)
            },
        },
    }
</script>

<style scoped>
    
</style>