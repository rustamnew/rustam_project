<script setup>

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
                    draggable 
                    @dragstart="startDrag($event, item)">
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
            startDrag(evt, item) {
                console.log(evt)
                console.log(item)
                evt.dataTransfer.dropEffect = 'move'
                evt.dataTransfer.effectAllowed = 'move'
                evt.dataTransfer.setData('itemID', item.id)
            },
            onDrop(evt, list) {
                const itemID = evt.dataTransfer.getData('itemID')
                const item = this.items.find((item) => item.id == itemID)
                item.list = list
            },
        },
    }
</script>

<style scoped>
    
</style>