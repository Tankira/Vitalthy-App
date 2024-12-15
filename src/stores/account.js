import { defineStore } from "pinia"
import { computed, reactive } from "vue"

export const useAccountStore = defineStore('accounts', () => {
    // Data
    const data = reactive({
        user: {},
        guest: computed(() => ('type' in data.user && data.user['type'] === 'guest')),
        setup: computed(() => ('setup' in data.user && data.user['setup']))
    })

    // Action
    const updateData = (dataObject) => {Object.assign(data.user, dataObject)}

    // Return
    return { data, updateData }
}, {persist: {storage: localStorage}})
