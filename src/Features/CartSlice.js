import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart_products:[],
    Final_Price:0,
    // quantity:1,
}

const CartSlice = createSlice ({
    name : "Cart",
    initialState,
    reducers:{
        set_quantity:(state,action) =>{
            state.quantity= action.payload
        },
        add_to_cart: (state, action) => {
            let product = action.payload     // we recieve the whole object of the product in order to add to cart.///
            // console.log(product.quantity)
            let proFind = state.cart_products.find(item => item.id == product.id)
            if(proFind){                 ///  if product already exist in the cart// than increase te quantity only///
                proFind.quantity += 1
            }
            else{
                product = {...product, quantity: 1}  // here we add an extra quantity variable// or initialize the variable//
                state.cart_products.push(product)
            }
        },
        increaseQuantity: (state, action) => {
            let proFind = state.cart_products.find(item => item.id == action.payload)
            if(proFind){
                proFind.quantity += 1
            }
            else {
                console.log("product not added yet")
            }
        },
        decreaseQuantity: (state, action) => {
            let proFind = state.cart_products.find(item => item.id == action.payload)
            if(proFind && proFind.quantity > 1){
                proFind.quantity -= 1
            }
            else{
            state.cart_products = state.cart_products.filter(item => item.id != proFind.id)  // deleting the product if quantity less than 1.// 
            }
        },

        remove_from_cart: (state,action)=>{
            state.cart_products = state.cart_products.filter(item => item.id !=action.payload)
        },

        Cart_Price:(state,action)=>{
            state.Final_Price= action.payload;
        }
    },
})

export const {add_to_cart,set_quantity, decreaseQuantity, increaseQuantity,remove_from_cart,Cart_Price} = CartSlice.actions;
export default CartSlice; 