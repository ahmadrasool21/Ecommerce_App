import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Products:[],
}

const productSlice = createSlice({
    name:"Ecom_Products",
    initialState,
    reducers:{        /// These are actions...
        setProducts:(state,action) => {
            if(action.payload){
             state.Products=action.payload;
            }
            else{
                state.Products=[]
            }
            
        },


        
        addProduct: (state, action) =>{    /// this reducer Push the newly added product to the existing product list ///...
        state.Products.push(action.payload)
          
         }
    }
})

export const {setProducts,addProduct }= productSlice.actions;   ///     exporting reducer actions....
export default productSlice;       ///     exporting the whole slice...