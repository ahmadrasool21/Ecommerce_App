import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../Features/ProductSlice";
import { setCurrentUser } from "../Features/UserSlice";
import axios from "axios";
import '../index.css'

const ProductAdd = () => {
    const dispatch = useDispatch();
    let { register, handleSubmit, setError, formState: { errors } } = useForm();
    let moveTo = useNavigate();


    const saveData = async(meraData) => {    // getting the user from backend ....///
         const formData= new FormData();
         // Append product fields to FormData
         formData.append('id', meraData.id);
         formData.append('title', meraData.title);
         formData.append('description', meraData.description);
         formData.append('brand', meraData.brand);
         formData.append('price', meraData.price);
         formData.append('category', meraData.category);
         formData.append('stock', meraData.stock);
          // Append image files to FormData if it exists
        if (meraData.productImage) {
            for (let i=0; i<meraData.productImage.length;i++){
        formData.append('productImage', meraData.productImage[i]); // Access the file using array indexing
        }}

        try {
            await axios.post("/product",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data' // Set appropriate headers for file upload
                } 
            }).then((response) => {
                if (response.data) {
                    alert(" New product has been added")
                    dispatch(addProduct(response.data))
                    moveTo("/Home");
                }
                else {
                    alert(response.data.msg)
                }
            })
        } catch (error) {
            console.log(error,"error while uploading")

        }
    }

    return (

        <div className="flex justify-center items-center">
            <div className="BackdropReg"></div>

            <form className="form-container sss" onSubmit={handleSubmit(saveData)}>

                <h2>Add Product</h2>
                {/* //// ID */}
                <div className="input-field">
                    <label className="label">id</label>
                    <input {...register('id', { required: true})} type="number" className="field" placeholder="Enter Id" />
                    {errors.id && errors.id.type == "required" ? <div className="error">The field is required</div> : null}
                </div>
                {/* ///// Title */}
                <div className="input-field">
                    <label className="label">title</label>
                    <input {...register('title', { required: true})} type="text" className="field" placeholder="Enter Title" />
                    {errors.title && errors.title.type == "required" ? <div className="error">The field is required</div> : null}
                </div>

                {/* //// Description*/}
                <div className="input-field">
                    <label className="label">Description</label>
                    <input {...register('description', { required: true})} type="text" className="field" placeholder="Enter Description" />
                    {errors.description && errors.description.type == "required" ? <div className="error">The field is required</div> : null}
                </div>
                
                {/* //// BRAND */}

                <div className="input-field">
                    <label className="label">Brand</label>
                    <input {...register('brand', { required: true})} type="text" className="field" placeholder="Enter Brand" />
                    {errors.brand && errors.brand.type == "required" ? <div className="error">The field is required</div> : null}
                </div>

                {/* //// PRICE */}
                <div className="input-field">
                    <label className="label">Price</label>
                    <input {...register('price', { required: true})} type="number" className="field" placeholder="Enter Brand" />
                    {errors.price && errors.price.type == "required" ? <div className="error">The field is required</div> : null}
                </div>
                
                {/* //// CATEGORY */}
                <div className="input-field">
                    <label className="label">Category</label>
                    <input {...register('category', { required: true})} type="text" className="field" placeholder="Enter category" />
                    {errors.category && errors.category.type == "required" ? <div className="error">The field is required</div> : null}
                </div>
                {/* /// STOCK */}

                <div className="input-field">
                    <label className="label">Stock</label>
                    <input {...register('stock', { required: true})} type="number" className="field" placeholder="Enter category" />
                    {errors.stock && errors.stock.type == "required" ? <div className="error">The field is required</div> : null}
                </div>

                {/* /// Images */}

                 <div className="input-field">
                    <label className="label">Product Image</label>
                    <input multiple {...register('productImage', { required: true })} type="file" className="field" />
                    {errors.productImage && errors.productImage.type === "required" && <div className="error">The field is required</div>}
                </div>

                <button type="submit" className="btn">
                    Add product
                </button>
            </form>
        </div>

    );

}

export default ProductAdd;