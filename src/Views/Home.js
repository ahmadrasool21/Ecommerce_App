import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
             

const Home = () => {
  const currentUser = useSelector((state)=> state.user.current_User);   /// getting current-user from the redux...
  const Products_array = useSelector((state)=> state.Ecom_Products.Products);  /// getting All the products from redux... 
  console.log(currentUser, "current_user");
  console.log(Products_array,"products array");
  let [filtered_products,setfiltered_products]=useState(Products_array);   /// this is to filter products array...
  let [filter_Items,setfilter_Items]= useState("");    /// this is to search products through search...
  

  let handlesearch=(e)=>{   
    const searchValue = e.target.value;         ///  this  is searching the products in filtered_products array...
    setfilter_Items(searchValue);
    const Search_products = Products_array.filter((product)=>
    product.title.toLowerCase().includes(filter_Items.toLowerCase()));
    filter_Items ==""? setfiltered_products([]): setfiltered_products(Search_products);  

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
  return setfiltered_products(Products_array.filter((product)=>(product.category == category )))
  }
  return setfiltered_products(Products_array);
 }
  



  return (
    <div>
      {`Welcome ${currentUser?currentUser.first_name:"user"}`}
      {/* {currentUser?<button onClick={()=>{ dispatch(setCurrentUser(null))}}>Logout</button>:<button onClick={()=>{ dispatch(setCurrentUser(null))}}>LogIn</button> } */}
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
        filtered_products.map((product,index)=>(
          <div key={index}>
              <img src={product.productImage[0]}/>
              <p><b><Link to={`/Product/${product.id}`}>{product.title}</Link></b></p>
              <p><b>Price:</b>{product.price}</p>
              <p><b>Brand:</b>{product.brand}</p>
              <p><b>Category:</b>{product.category}</p>
          </div>
        ))
      }



      </div>
  )
}

export default Home;