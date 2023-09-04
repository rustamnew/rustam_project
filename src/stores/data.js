import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {

    state: () => {
        
        return {
            localStorage: {
                buy_items_all: [],
                calendar: {}
            },
            cookie: {
        
            },
        }
    },

    actions: {
        loadData() {
            if (localStorage.buy_items_all) {
                this.localStorage.buy_items_all = JSON.parse(localStorage.buy_items_all)
            }
        },
        getData(id, type) {
            if (id == 'all') {

                return this.localStorage[type]
            }
        },

        saveData(obj, type) {

            //localStorage
            this.localStorage[type].push(obj)
            let new_obj = JSON.stringify(this.localStorage[type])
            localStorage[type] = new_obj
        },

        saveLocalStorage(type) {
            let new_obj = JSON.stringify(this.localStorage[type])
            localStorage[type] = new_obj
        },

        removeData(id, type) {
            let item = this.localStorage[type].find( (item) => item.id == id)
            let index = this.localStorage[type].indexOf(item)

            //this.localStorage[type][index]

            if (index > -1) {
                let test = this.localStorage[type]
                console.log(test)
                console.log(item)
                this.localStorage[type].splice(index, 1);
                console.log(this.localStorage[type])

                this.saveLocalStorage(type)
            }
              
        }
    }
  //return { dataObj, getData, saveData}
})