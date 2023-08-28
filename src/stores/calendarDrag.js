import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarDragStore = defineStore('calendarDrag', () => {
  const dragObj = ref({})

  function dragObjSet(obj) {
    dragObj.value = obj
  }

  return { dragObj, dragObjSet}
})