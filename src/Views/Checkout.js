import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, remove_from_cart} from "../Features/CartSlice";
import { useState } from "react";
import { Cart_Price } from "../Features/CartSlice";


const Checkout=()=>{
    //   let [FinalPrice,SetFinalPrice]= useState(0)
      let dispatch = useDispatch()
      let cartProducts = useSelector ((store)=>{    //getting the cart products from redux..
        return store.Cart.cart_products;
      })

      let cartPrice = useSelector((store)=>{
        return store.Cart.Final_Price;
      })

    
      
    //   cartProducts.forEach(product => {
    //     FinalPrice += product.price
    //   });

      const handlequantity=(id,PlusMinus)=>{
        if (PlusMinus==="-"){
           return dispatch(decreaseQuantity(id))
            
        }
        return dispatch(increaseQuantity(id))
      }

      const removeProduct=(id)=>{
         return dispatch(remove_from_cart(id))
      }

return(
    <div>
    <h2>Cart Products</h2>
    <ul>
    {cartProducts.map((product,index)=>(
            <li key={index}>
                <h1><b>Title</b></h1>
                {product.title}
                <h1><b>Product-Description</b></h1>
                {product.description}
                <h2><b>Product-Quantity</b></h2>
                {/* {product.quantity} */}
                <button onClick={()=>{handlequantity(product.id,"-")}}>-</button>
                <span>{product.quantity}</span>
                <button onClick={()=>{handlequantity(product.id,"+")}}>+</button>
                <br></br>
                <br></br>
                <h1><b>Total Price</b>{cartPrice}</h1>
                <button onClick={()=>{removeProduct(product.id)}}>Remove from cart</button>
                </li>
                
))}
</ul>
    </div>

)
}

export default Checkout;