<script setup>

import {useCalendarDragStore} from '../../../stores/calendarDrag'
const calendarDragStore = useCalendarDragStore();

</script>

<template>
    <div class="needs-wrapper">
        <div class="needs">
            <h3>Потребности</h3>

            <div class="needs-list">
                
                <template v-for="item in items" :key="item.name">
                    <div class="item" :style="{
                        backgroundColor: item.color,
                        color: '#fff'
                    }" 
                    @dragstart="startDrag($event, item)"
                    @drop="dropDrag($event, item)"
                    @dragend="endDrag($event, item)"
                    draggable="true">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">{{ item.price }}р.</div>
                    </div>
                </template>

        
            </div>

            <div class="needs-add">
                <button class="button">Добавить</button>
            </div>
        </div>
    </div>
    
    
</template>

<script>
    export default {
        data() {
            return {
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
                console.log(e.target)

                e.target.classList.add('dragging')
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