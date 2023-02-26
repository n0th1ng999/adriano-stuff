<template>
    
    <v-app >
        <v-navigation-drawer v-model="showNav" :absolute="true" :border="0"  temporary>

            <v-container>
                <h class="text-h5">
                    <v-icon icon="mdi-cart"></v-icon>
                    Carrinho
                </h>

            </v-container>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="Product in ShowCart">
                    <div class="flex flex-row">
                        <h6 class="text-h6 w-75">
                            Produto: {{ Product.id }} 
                            
                        </h6>
                     
                        <v-icon icon="mdi-delete" color="red" @click="ActivateRemoveProductDialog(Product.id)"></v-icon>

                    </div>
   
                  
                    
                    <v-divider ></v-divider>
                    
                    
                    
                    
                    <v-list-item-content class="d-flex flex-row align-center py-2" >

                       
                            <v-btn  
                          
                           
                            @click="Cart.addProduct(Product.id)">+</v-btn>
    
    
                            <input 
                            class="customInput"
                            style="width:100%;height: 100%;text-align:center;" @change="
                                Product.quantity > 99 ? Product.quantity = 99 : null;
                                Product.quantity <= 0 ? RemoveProduct(Product.id,Product.quantity) : null;
                                Product.quantity <= 0 ? Product.quantity = 1 : null;"
                            v-model.number="Product.quantity">
    
    
                            <v-btn @click="RemoveProduct(Product.id,Product.quantity)">-</v-btn>
                           
                           
    
    
    
                            
                                

                    
                            
                      
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            
            
        </v-navigation-drawer>
       
        <v-app-bar :elevation="0">
            <v-btn
           
            @click="showNav = !showNav"
            rounded
            color="primary"
            icon="mdi-cart"
            >
            
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
//Icons

export default {
    
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      showNav: false,
      //Icons
    
    }),
    setup () {
        
        const dialog = ref(false)
        const ProductToRemove = ref('')
        const Cart = useCartStore()

        const ShowCart = Cart.ComputedCart
        
        function RemoveProduct(id,quantity){
            if(dialog.value == true){
                Cart.removeProduct(id)
            }else if(quantity - 1 <= 0){
                ActivateRemoveProductDialog(id)
            }else{
                Cart.removeProduct(id)  
            }
        }

        function ActivateRemoveProductDialog(id){
            ProductToRemove.value = id
            dialog.value = true
        }

        function RemoveNumbers(){
            
        }

        return {ShowCart,Cart,RemoveProduct,dialog,ProductToRemove,ActivateRemoveProductDialog}
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