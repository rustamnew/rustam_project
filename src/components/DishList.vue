<script setup>
defineProps({
  /*msg: {
    type: String,
    required: true
  }*/
})
</script>

<template>
    <section class="dishes" id="listDish">
        <h3>Блюда</h3>

        <div class="container">
            <div class="list">
                
                <div class="item">
                    <div class="title">Пирожок с мукой</div>

                    <div class="parts">
                        <div class="ingredient">
                            <div class="name">Мука</div>
                            <div class="quantity">100г.</div>
                        </div>
                        <div class="ingredient">
                            <div class="name">Мука</div>
                            <div class="quantity">100г.</div>
                        </div>
                        <div class="ingredient">
                            <div class="name">Мука</div>
                            <div class="quantity">100г.</div>
                        </div>
                        <div class="ingredient">
                            <div class="name">Вода</div>
                            <div class="quantity">100г.</div>
                        </div>
                    </div>

                    <a href="#" class="button">
                        <span>В список</span>
                    </a>
                </div>
                
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
