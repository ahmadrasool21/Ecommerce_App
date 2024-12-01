import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const baseUrl = "http://localhost:3000";

const Home = () => {
  const currentUser = useSelector((state)=> state.user.current_User);   /// getting current-user from the redux...
  const Products_array = useSelector((state)=> state.Ecom_Products.Products);  /// getting All the products from redux... 
 
  let [filtered_products,setfiltered_products]=useState(Products_array);   /// this is to filter products array...
  let [filter_Items,setfilter_Items]= useState("");    /// this is to search products through search...
  ////  this below is for pagenation of product pages ////
  const [CurrentPage,setCurrentPage]= useState(1); /// this is to set current page..
  const Posts_per_page = 3;
  const last_index = CurrentPage * Posts_per_page
  const first_index = last_index - Posts_per_page
 
  const current_posts = filtered_products.slice(first_index,last_index);
  
  let handlesearch=(e)=>{   
    const searchValue = e.target.value;         ///  this  is searching the products in filtered_products array...
    setfilter_Items(searchValue);
    const Search_products = Products_array.filter((product)=>
    product.title.toLowerCase().includes(filter_Items.toLowerCase())||
    product.description.toLowerCase().includes(searchValue)||
    product.price.toString().includes(searchValue)
  );
    filter_Items ==""? setfiltered_products(Products_array): setfiltered_products(Search_products);
    setCurrentPage(1);
  
  }

 

  let categories = ["all"];
  Products_array.forEach((product,index)=>{            /// this is putting the unique categories in new array...
    if (!categories.includes(product.category)){
        categories.push(product.category)
    }
  }
  )


 const  handleCategory = (category) => {                 ///  this is for selecting the  specific category....
  console.log(category)
  if (category !=="all"){
  setfiltered_products(Products_array.filter((product)=>(product.category == category )))

  }
  else{
   setfiltered_products(Products_array);
 }
 setCurrentPage(1);
}



  return (
    <div>
      {`Welcome ${currentUser?currentUser.first_name:"user"}`}

      <br></br>
      <label><b>Search_products:   </b></label>
      <input type='text' placeholder='search products' onChange={handlesearch} value={filter_Items}/>
      {/* displaying categories buttons  */}
      <h2><b>Categories</b></h2>
      {categories.map((category,index)=>{
          return (
          <div key={index}>
            {console.log(category,index)}
           <button onClick={()=>handleCategory(category)}>{category}</button>
          </div>)
})}

      {/*this is for displaying or mapping the products on the home page*/}
      {   
        current_posts.map((product,index)=>(
          <div key={index}>
              <img src={product.productImage[0]}/>
              <p><b><Link to={`/Product/${product.id}`}>{product.title}</Link></b></p>
              <p><b>Price:</b>{product.price}</p>
              <p><b>Brand:</b>{product.brand}</p>
              <p><b>Category:</b>{product.category}</p>
              <p><b>Description:</b>{product.description}</p>
          </div>
        ))
      }

      {/*                 this is a pagination component                    */}

      {
        <Pagination Posts_per_page={Posts_per_page} setCurrentPage={setCurrentPage} filtered_products={filtered_products}/>
      }



      </div>
  )
}

export default Home;