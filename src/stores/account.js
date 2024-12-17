import { defineStore } from "pinia"
import { reactive, computed } from "vue"

export const useAccountStore = defineStore('accounts', () => {
    // Data
    const data = reactive({
        user: {},
        guest: computed(() => ('type' in data.user && data.user['type'] === 'guest')),
        setup: computed(() => ('setup' in data.user && data.user['setup']))
    })

    const healthIndex = reactive({
        bmi: computed(() => ((data.user.weight)/((data.user.height/100)**2)).toFixed(1)),
        bfp: computed(() => {
            if (data.gender === 'male') {
                return ((1.20*healthIndex.bmi)+(0.23*data.user.age)-16.2).toFixed(1)
            } else {
                return ((1.20*healthIndex.bmi)+(0.23*data.user.age)-5.63).toFixed(1)
            }
        }),
        bmr: computed(() => {
            if (data.user.gender === 'male') {
                return (((10*data.user.weight)+(6.25*data.user.height)-(5*data.user.age)+5).toFixed())
            } else {
                return (((10*data.user.weight)+(6.25*data.user.height)-(5*data.user.age)-161).toFixed())
            }
        }),
        lbm: computed(() => (((data.user.weight-(data.user.weight*(healthIndex.bfp/100)))/data.user.weight)*100).toFixed()),
        tdee: computed(() => ((healthIndex.bmr * data.user.rtdee)).toFixed())
    })

    // Action
    const updateData = (dataObject) => {Object.assign(data.user, dataObject)}

    // Return
    return { data, healthIndex, updateData }
}, {persist: {storage: localStorage}})
