<script setup>
import Dish from '../components/Dish/Dish.vue'
import Calendar from '../components/Calendar/Calendar.vue'
import Dialog from '../components/Dialog/Dialog.vue';

//import {useMainPagesStore} from '../stores/mainPages'
//const mainPageStore = useMainPagesStore();
</script>

<script>
    export default {
        data() {
            return {
            //page: 0
            //transition: 'right'
            }
        },
        methods: {
            
        },
        components: {

        },
        mounted() {
            const swiperEl = this.$refs.swiper;
            const buttonEl = document.querySelector('.item');

            const swiperParams = {
                slidesPerView: 1,
                initialSlide: 2,
                allowTouchMove: false,
                pagination: {
                    el: this.$refs.paginationLine,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<div class="item ' + className + '">' + (index) + '</div>';
                    },
                }
            };

            Object.assign(swiperEl, swiperParams);
            swiperEl.initialize();
        }
    }
</script>


<template>
    <Dialog />
    <swiper-container 
        ref="swiper" 
        init="false"
        allowTouchMove="true" 
        slides-per-view="1"
        pagination="true"  
        speed="500">

        <swiper-slide>
            <Dish />
        </swiper-slide>

        <swiper-slide>
            <Calendar />
        </swiper-slide>

    </swiper-container>

    <div class="pageSlider" ref="pagination">
        <div class="line" ref="paginationLine">
            <!-- 
            <div class="item" @click="mainPageStore.pageSet(0)">0</div>
            <div class="item" @click="mainPageStore.pageSet(1)">1</div>
            <div class="item" @click="mainPageStore.pageSet(2)">2</div>
            <div class="item" @click="mainPageStore.pageSet(3)">3</div> 
            -->
        </div>
    </div>


</template>

<style>

</style>
