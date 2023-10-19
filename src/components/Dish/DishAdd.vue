<script setup>
defineProps({
  msg: {
    type: String,
    //required: true
  }
})
</script>

<template>
    <section class="add" id="addDish">
        <h3>Добавить блюдо</h3>
        <div class="container">
            <div class="card">
                <div class="title">
                    <input type="text" placeholder="Название" id="card-title">
                </div>

                <div class="parts">
                    <!--
                    <div class="item">
                        <div class="name">
                            Мука
                        </div>
                        <div class="quantity">
                            100г.
                        </div>
                    </div>
                    -->
                    <div class="item-input">
                        <div class="name">
                            <input type="text" placeholder="Название ингридиента" id="card-ingredient">
                        </div>

                        <div class="quantity">
                            <input type="text" placeholder="Вес" id="card-weight">
                        </div>
                    </div>

                    <div class="plus">+</div>
                </div>

                <a href="#" class="button" id="addDishButton">
                    <span>Добавить</span>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
