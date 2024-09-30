import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const Products = () => {
    // const dispatch= useDispatch();
    const Products_array = useSelector((state)=> state.Ecom_Products.Products);
    const [products,setproducts]= useState(Products_array);
    
return(
    products.map((product)=>{
        <li>{product}</li>
    })

)}
export default Products;










// useEffect(() => {
//     const fetchData = async()=>{
//         try{
//               const res = await axios.get("/product");
              
//         } catch(error){


//         }
//     }
// },[]) 