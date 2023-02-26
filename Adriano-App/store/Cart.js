import { defineStore } from 'pinia'

export const useCartStore = defineStore('Cart', () => {
    // { id: '', quantity: 0 }
    const cart = ref([
        { id: '1', quantity: 1 }
    ])

    function addProduct(id) {
        const i = cart.value.findIndex(el => el.id == id)
        if(i != -1){
            cart.value[i].quantity += 1
        }else{
            cart.value.push({ id: id, quantity: 1 })
        }

    }

   function removeProduct(id, all = false){
        const i = cart.value.findIndex(el => el.id == id)
        if(i != -1){
            if(all){
                cart.value.splice(i, 1)
            }
            else if(cart.value[i].quantity - 1 == 0){
                cart.value.splice(i, 1)
            }else {
                cart.value[i].quantity -= 1
            }
        }

   }

    

    return {addProduct,removeProduct,ComputedCart: computed(() => cart.value)}
})