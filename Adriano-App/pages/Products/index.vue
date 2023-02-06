<template>
    <v-container>

        <v-row no-gutters>
        <h1>
            Product Page {{ id }} 
        </h1>
        </v-row>
        <v-row >
        <v-col v-for="n in 3"
        cols="12"
        lg="4"
         sm="6"> 
            <v-card outlined>
                <v-card-title>
                    Produto {{ n }}
                </v-card-title>

                <v-divider></v-divider>
                <v-list>

                <v-list-group >
                    <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        
                        title="Description"
                    >
              
                </v-list-item>
                    </template>
                    
                    <v-list-item>Description</v-list-item>
                   

               </v-list-group>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="Cart.addProduct(n,1)">Adicionar</v-btn>
                    <v-btn :to="`/Products/${n}`">Ver</v-btn>
                </v-card-actions>
            </v-card>
            
        </v-col>

 

    
        
        </v-row>
        
    </v-container>
</template>

<script setup>
import { useCartStore } from '@/store/Cart';

definePageMeta({
    layout: 'shop-layout'
})

const Cart = useCartStore()

</script>

<style lang="scss" scoped>

</style>