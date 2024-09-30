import axios from "axios";
import { useState } from "react";

const ProductUpload =() =>{
    const [formData,setFormData]= useState({     //  different input states managing..// 
       
        productTitle:"",
        productDescription:"",
        productBrand:"",
        productPrice:0,
        productCategory:"",
        productStock:0,
        productImage:null,

    });


        const handleSubmit = async(e)=>{                 // handling form data submission through current states..// 
            e.preventDefault();
            const data = new FormData();
            data.append("ProductTitle",formData.productTitle);
            data.append("ProductDescription",formData.productDescription);
            data.append("ProductBrand",formData.productBrand);
            data.append("ProductPrice",formData.productPrice);
            data.append("ProductCategory",formData.productCategory);
            data.append("ProductStock",formData.productStock);
            data.append("ProductImage",formData.productImage);
            
            try{
                const response = await axios.post("/createProduct",data,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(response.data)
            } catch(error){
                console.error(error)
            }


        }

        const handleChange =(e)=>{
            const{name,value,files}= e.target;
            setFormData((prevState)=>({
                ...prevState,       // Spreading the previous state to retain existing values..
                [name]:files ?  files[0]:value,  // Setting the new value for the specific field..
            }))
        }



        return(
            <form onSubmit={handleSubmit}>

            <input
              name="productTitle"
              type="text"
              placeholder="Product title"                       // Product title.
              value={formData.productTitle}
              onChange={handleChange}
               />

            <textarea
              name="productDescription"
              type="text"
              placeholder="Product description"                       // Product title.
              value={formData.productDescription}
              onChange={handleChange}
               />   
            
            <input
            name="ProductBrand"
            type="text"
            placeholder="Brand Name"                          // Brand Name.
            value={formData.productBrand}
            onChange={handleChange}
            />

            <input
            name="productPrice"
            type="number"
            placeholder="Price"                                 // Price.
            value={formData.productPrice}
            onChange={handleChange}
            />


            <input
            name="productCategory"
            type="text"
            placeholder="category"                                 // category.
            value={formData.productCategory}
            onChange={handleChange}
            />

            <input
            name="productStock"
            type="number"
            placeholder="stock"                                 // stock.
            value={formData.productStock}
            onChange={handleChange}
            />

            <input
            name="productImage"
            type="file"
                                                                  // uploading an image.
            onChange={handleChange}
            />

            <button type="submit">Upload Product</button>
            </form>
        );

}

export default ProductUpload;