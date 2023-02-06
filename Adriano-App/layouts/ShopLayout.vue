<template>
    
    <v-app >
        <v-navigation-drawer v-model="showNav" :absolute="true" :border="0" color="deep-purple-accent-2" temporary>
            <v-list>
                <v-list-item v-for="Product in ShowCart">
                    <v-list-title>
                        Produto:{{ Product.id }} 

                    </v-list-title>
                    <v-list-item-subtitle>
                        <v-toolbar dense>
                            <v-btn @click="Cart.addProduct(Product.id)">+</v-btn>
                            <v-text-field @change="Product.quantity;" v-model="Product.quantity"></v-text-field>
                          
                            <v-btn @click="RemoveProduct(Product.id,Product.quantity)">-</v-btn>

                        </v-toolbar>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
            
            
        </v-navigation-drawer>
       
        <v-app-bar :elevation="0">
            <v-btn
            variant="tonal"
            @click="showNav = !showNav"
           
            color="primary"
            >
            CART
        </v-btn>
        <v-icon ></v-icon>
    </v-app-bar>

    <!-- Dialog q pergunta se o user quer remover o produto-->
    <v-dialog class="center"
      v-model="dialog"
    >
      <v-card width="500">
        <v-card-text >
          Tem a certeza que quer remover este produto ?
        </v-card-text>
        <v-container>
            <v-row >
                <v-col col="6">
                    <v-btn color="green" block @click="RemoveProduct(ProductToRemove) ;dialog = false">Sim</v-btn>

                </v-col>    
                <v-col col="6">
                    <v-btn color="red" block @click="null ;dialog = false">Não</v-btn>

                </v-col>    
            </v-row>
          
        </v-container>
      </v-card>
    </v-dialog>
    
    <v-main>
            <slot />
    </v-main>
</v-app>

    
    
</template>

<script>
import { useCartStore } from '@/store/Cart';

export default {
    
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      showNav: false,
     
    }),
    setup () {
        
        const dialog = ref(false)
        const ProductToRemove = ref('')
        const Cart = useCartStore()

        const ShowCart = Cart.ComputedCart
        
        function RemoveProduct(id,quantity){
            if(dialog.value == true){
                Cart.removeProduct(id)
            }else if(quantity - 1 == 0){
                ProductToRemove.value = id
                dialog.value = true
    
            }else{
                Cart.removeProduct(id)
            }
        }

        function RemoveNumbers(){
            
        }

        return {ShowCart,Cart,RemoveProduct,dialog,ProductToRemove}
    }
}
</script>

<style lang="css" scoped>
    .v-overlay__content {
        align-items: center;
    }

    .v-navigation-drawer  {
        z-index: 999999 !important;
    }
</style>