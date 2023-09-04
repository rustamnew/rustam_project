<script setup>
    import {useDialogStore} from '../../stores/dialog';
</script>

<script>
    export default {
        data() {
            const dialogStore = useDialogStore()

            return {
                dialogStore
            }
        },

        mounted() {

        },

        methods: {
            confirm() {
                document.querySelector('.dialog.active').classList.remove('.active')
                this.dialogStore.state = false
                this.dialogStore.callback()
            }
        }
    }

</script>

<template>
    <div class="dialog fullscreen" :class="this.dialogStore.state == true ? 'active' : ''">
        <div class="content">
            <h2>Вы уверены что хотите удалить?</h2>

            <div class="buttons">
                <button 
                @click="confirm()"
                class="button dialog_button">Да</button>
                <button class="button dialog_button">Нет</button>
            </div>
        </div>
    </div>
</template>