
const express = require("express");
const multer = require('multer');
const path = require('path');
const pp = express.Router();
const axios = require("axios")
const app = express();
const cors = require("cors");
let jwt= require("jsonwebtoken")
const mongoose= require("mongoose")


require("./db/db")        /// getting to the database folder ///


// Middlewares to parse request bodies ///
app.use(express.json());
app.use(cors());    /// connecting app with cors ////
app.listen(4500, () => {   //// this app server will be listen at the port 4500 ////
    console.log("Server is running on port 4500");
});

// database models to fetch and store data //
const Product = require('./db/model/productModel')   // getting product model from db 
const ProductsData= require("./db/model/ProductData")  // getting productData model from db
const Users = require('./db/model/userModel')   // getting user model from db 

//////  populating database with initial data ///////
const populateInitialData = async () => {         
    try {
        const userCount = await Users.countDocuments();
        if (userCount === 0) {
            // Populate the database with initial users
            await Users.create([
                { email: "a@a.com", password: "1212", first_name: "Ahmad", last_name: "Rasool" },
                { email: "asad@a.com", password: "1212", first_name: "Asad", last_name: "Khan" },
                { email: "daud@d.com", password: "1212", first_name: "Daud", last_name: "Khalid" }
            ]);
            console.log("Initial data inserted");
        } else {
            console.log("Database already populated");
        }
    } catch (error) {
        console.error("Error populating database:", error);
    }
}

// Call the function after connecting to the database //
mongoose.connection.once("open",populateInitialData)

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/server/my_uploads'); // Directory where the image will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
    }
});

const upload = multer({ storage: storage });

////////    this is to filter fetched data from the online product API    ////////
const filterProductData=(productsFromAPI)=>{
        return productsFromAPI.map(product=>({
            id:product.id,
            title:product.title,
            description:product.description,
            brand:product.brand,
            price:product.price,
            category:product.category,
            stock:product.stock,
            rating:product.rating,
            reviews: product.reviews.map(review => ({
                rating: review.rating,
                comment: review.comment,
                date: new Date(review.date), // Convert string date to Date object
                reviewerName: review.reviewerName,
                reviewerEmail: review.reviewerEmail
            })),
            productImage:product.images,

        }))
}


const fetchProductsFromAPI = async () => {
    try {
        const res = await axios.get('https://dummyjson.com/products');
        return filterProductData(res.data.products);//this is to filter specific data fields from the data response
    } catch (error) {
        console.error("Error fetching from API:", error);
        return null;
    }
};



////////////////////////////////////      API's FOR USER        //////////////////////////////////// 

app.post("/signup", async(req,res) => {              /// for registering the user ///
    try {
        const {email,password,first_name,last_name} = req.body;      //// destructure DATA from the object ////

        // Find the user with the provided email ////
        let user = await Users.findOne({email:email});
        if (!user) {
            /// creating a new user in a database///
            let newUser = await Users.create({ email:email, password: password, first_name: first_name, last_name: last_name});

            /// creating the token ///
            jwt.sign({email:email},"this is cat",{expiresIn: "1m"}, 
                function(err,token){
                    if (err){
                        return res.status(500).json({error:"Token will not be created"})
                    }
                    res.json({myToken:token, msg: "User-Added", userSignedUp : true, newUser})
                });
            return;
        }
        console.log("user Exist")
        return res.json({ msg: "user alraedy exist", userSignedUp:false });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});



/////////////////////                    for  sign in the user API       / ///////////////////
app.post("/signin", async(req, res) => {
    try {
        console.log("Hi request")
        const { email, password } = req.body;
        console.log(email,password)
        // Find the user with the provided email and password//////
   let user = await Users.findOne({email:email, password:password});/////
        if (!user) {
            return res.json({ msg: "User not exist"});
        }
        ///   if user found than create a token ///
        jwt.sign({email : user.email}, "this is cat", {expiresIn: "5m"},
            function(err,token){
                res.json({
                    myToken:token,
                    user
                });
            }
         )} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

  ////  checking the token validity////...

app.post("/check-Token",(req,res)=>{
    jwt.verify(req.body.token, "this is cat", function(err,myData) {    // here we are getting the token from request //
        if (err){
            console.log(myData);
            console.log(err);
            res.json({success: false});      /// sending a signal at front end through success message ///...
        } 
        else{

            const c_user= Users.find(user=>user.email== myData.email); 
            console.log("my data is verified in the index file");
            console.log(myData);
            res.json({success: true, c_user});  /// sending a signal at front end through success message ///...
        }                                       /// also sending the current user 

    })
}); 


//// getting all the users from the database //// 

app.get("/users/all", async(req,res)=>{      
    try{
    let AllUsers = await Users.find();
    res.status(200).json(AllUsers);
    } catch(error){
    res.status(500).json({ error: "Error fetching users" });
    }
})

//// getting THE SINGLE user from the database //// 

app.get(`/users/:email`, async(req,res)=>{
    try{
    let user= await Users.findOne({email:req.params.email});
    if (!user){
    res.status(500).json("user not found")
    }
    res.status(200).json({user,msg:"user found"})
    } catch(error){
        res.status(500).json("server side issue")
    }
})
//// editing the single user data from the database //// 




app.put(`/users/edit/:email`, async(req,res)=>{
    try{
        const { first_name, last_name, password, password_confirmation} = req.body;

        if (password !== password_confirmation){
            return res.status(404).json("password does not match");  
        }
        let UpdatedUser= await Users.findOneAndUpdate({email:req.params.email},
            {
                first_name: first_name,
                last_name: last_name,
                password: password
            },
            { new: true }
        )

        if(!UpdatedUser){
            return res.status(404).json({ msg: "User not found"});
        }
        else{
            return res.status(200).json({ msg:"user updated successfully", UpdatedUser})
        }
    }catch(error){
        res.status(500).json({ error: "Server error" });
    }
})

//// deleting  the selected user from the database //// 

app.delete(`/users/delete/:email`, async(req,res)=>{
    try{
    let User = await Users.findOne({email:req.params.email});
    if(!User){
        return(res.status(404).json("user not found to be deleted"))
    }
    let DeletedUser = await Users.deleteOne({email:req.params.email});
    res.status(200).json({msg: "user deleted successfully", DeletedUser})
    } catch(error){
        res.status(500).json("user not found")
    }
})


// ////////////////////////////////////////   Product    //////////////////////////////////////////

app.post('/product',upload.array("productImage",10), async(req,res) => {                    ///  for saving new product  ///
try{
    // Extract image paths and save them along with other product details //
    const imagePaths = req.files.map(file => file.path);

    let product = new ProductsData({     /// passing data object to the database instance object ///
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        productImage: imagePaths // Save image paths as an array in the product document

    })
    await product.save();
    res.send(product)
} catch(error){
    console.error("error occuring at fetching products")
    res.status(500).json(error)
}

})

////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/products', async(req,res) => {                 //// for getting products from database ////
    try{
    // Check if products are already in the database
    let products = await ProductsData.find();

    if(products.length===0){
         // If no products are found, fetch from online API   
         console.log("No products in DB. Fetching from online API...");
         const productsFromAPI = await fetchProductsFromAPI();
         console.log(productsFromAPI,"api fetched products")
        //////////////////   Save the fetched products to the database  /////////////////////
        ProductsData.insertMany(productsFromAPI);
        console.log(productsFromAPI,"after inserting products")
    }
    /// send the products from databse to the frontend ///
    res.status(200).json(products)
    
    } catch(error){
        res.status(404).json(error)  
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/product/:id', async(req, res) => {
    try{
    let products= await Product.findById(id);
    res.status(200).json(products)
    }catch(error){
        console.error(error)
        res.status(500).json(error)
    }

})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put(`/product/edit/:_id`, async(req,res)=>{
    try{
        const { first_name, last_name, password, password_confirmation} = req.body;

        if (password !== password_confirmation){
            return res.status(404).json("password does not match");  
        }
        let UpdatedUser= await Users.findOneAndUpdate({email:req.params.email},
            {
                first_name: first_name,
                last_name: last_name,
                password: password
            },
            { new: true }
        )

        if(!UpdatedUser){
            return res.status(404).json({ msg: "User not found"});
        }
        else{
            return res.status(200).json({ msg:"user updated successfully", UpdatedUser})
        }
    }catch(error){
        res.status(500).json({ error: "Server error" });
    }
})
