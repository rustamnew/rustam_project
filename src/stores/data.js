import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {

    state: () => {
        
        return {
            localStorage: {
                buy_items_all: [],
                calendar: {
                    /*'2023-09-08': {
                        day_buy_items: [

                        ]
                    }*/
                }

                
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
            if (localStorage.calendar) {
                this.localStorage.calendar = JSON.parse(localStorage.calendar)
            }
        },
        getData(id, type) {
            if (id == 'all') {

                return this.localStorage[type]
            }
        },

        saveData(obj, type, date = false) {
            if (type == 'buy_items_all') {
                this.localStorage[type].push(obj)
                let new_obj = JSON.stringify(this.localStorage[type])
                localStorage[type] = new_obj
            }
            if (type == 'calendar') {
                if (!this.localStorage[type][date]) {
                    this.localStorage[type][date] = {}
                }
                if (!this.localStorage[type][date].day_buy_items) {
                    this.localStorage[type][date].day_buy_items = []
                }
                this.localStorage[type][date].day_buy_items.push(obj)
                let new_obj = JSON.stringify(this.localStorage[type])
                localStorage[type] = new_obj
            }
            
            
        },

        saveLocalStorage(type) {
            let new_obj = JSON.stringify(this.localStorage[type])
            localStorage[type] = new_obj
        },

        removeData(id, type) {
            if (type == 'calendar') {
                this.saveLocalStorage(type)
            } else {

                let item = this.localStorage[type].find( (item) => item.id == id)
                let index = this.localStorage[type].indexOf(item)
    
                if (index > -1) {
                    //let test = this.localStorage[type]
                    //console.log(test)
                    this.localStorage[type].splice(index, 1);
    
                    this.saveLocalStorage(type)
                }
            }

              
        }
    }
  //return { dataObj, getData, saveData}
})