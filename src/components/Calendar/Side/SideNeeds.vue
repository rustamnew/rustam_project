<script setup>

import {useCalendarDragStore} from '../../../stores/calendarDrag';
import {useDataStore} from '../../../stores/data';
import {useDialogStore} from '../../../stores/dialog';

</script>

<template>
    <div class="needs-wrapper">
        <div class="needs">
            <h3>Покупки</h3>

            <div class="needs-list">
                
                <template v-for="item in items" :key="item.name">
                    <div class="needs-item" :style="{
                        backgroundColor: item.color,
                    }" 
                    :black-font="item.color ? 'true' : 'false'"
                    :buy-item-id="item.id"
                    @dragstart="startDrag($event, item)"
                    @drop="dropDrag($event, item)"
                    @dragend="endDrag($event, item)"
                    draggable="true">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">{{ item.price }}</div>
                        <div class="remove" @click="removeBuyItem($event)">
                            <img src="../../../assets/images/icons/cross.svg" alt="Закрыть">
                        </div>
                    </div>
                </template>

        
            </div>

            <div class="needs-add">
                <button class="button"
                @click="addBuyItem()">Добавить</button>

                <div class="inputs" v-if="showAddButtons">
                    <input class="input" type="text" name="add-needs-name" placeholder="Название" @keyup="inputsCheck()">
                    <input class="input" type="number" name="add-needs-price" placeholder="Стоимость" @keyup="inputsCheck()">

                    <button class="check-submit" :class="{active: activeCheckSumbit}" @click="buyItemAddSubmit()">
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
            const dataStore = useDataStore()
            const dialogStore = useDialogStore()

            return {
                showAddButtons: false,
                activeCheckSumbit: false,
                dataStore,
                dialogStore,
                items: []
            }
        },

        mounted() {
            this.loadData()
        },

        methods: {
            loadData() {
                console.log(this.dataStore.getData('all', 'buy_items_all'))
                this.items = this.dataStore.getData('all', 'buy_items_all')
            },

            addBuyItem() {
                this.showAddButtons = true

                setTimeout(() => {
                    document.querySelector('[name=add-needs-name]').focus()
                }, 1);
                
            },

            buyItemAddSubmit() {
                let name_input = document.querySelector('input[name=add-needs-name]')
                let price_input = document.querySelector('input[name=add-needs-price]')

                let name = name_input.value
                let price = price_input.value

                //Найти максимальный id (временно)
                let max_id = 0
                this.items.map( (obj) => {
                    if (obj.id > max_id) {
                        max_id = obj.id
                    }
                })

                //Случайный цвет (временно)
                let random_color = Math.floor(Math.random()*16777215).toString(16);
                if (random_color.length < 6) {
                    random_color += 1
                }

                let obj = {
                    id: max_id + 1,
                    name: name,
                    price: price,
                    type: 'needs',
                    color: '#' + random_color
                }


                this.dataStore.saveData(obj, 'buy_items_all')

                

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

            removeBuyItem(e) {
                let item = e.target.closest('.needs-item')
                let id = item.getAttribute('buy-item-id')

                this.dialogStore.showConfirmDialog(() => {
                    this.removeBuyItemConfirmed(item, id)
                })
            },

            removeBuyItemConfirmed(item, id) {
                console.log(item)
                console.log(id)
                item.classList.add('removing')
                setTimeout( () => {
                    this.dataStore.removeData(id, 'buy_items_all')
                }, 500)
            },

            startDrag(e, item) {
                console.log(e)
                e.target.classList.add('dragging');

                let created_obj = {};
                created_obj.id = item.id;
                created_obj.color = item.color;
                created_obj.name = item.name;
                created_obj.price = item.price;
                created_obj.type = item.type;

                const calendarDragStore = useCalendarDragStore();
                calendarDragStore.dragObjSet(created_obj);
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