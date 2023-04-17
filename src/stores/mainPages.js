import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainPagesStore = defineStore('mainPages', () => {
  const page = ref(0)

  function pagePlus() {
    page.value++
  }
  function pageMinus() {
    page.value--
  }
  function pageSet(n) {
    page.value = n
  }

  return { page, pagePlus, pageMinus, pageSet}
})
