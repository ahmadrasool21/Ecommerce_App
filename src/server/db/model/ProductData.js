const mongoose = require("mongoose")

const productschema = new mongoose.Schema({

    id:{                     // id
        type:Number,
        required:true
    },

    title:{                   //title
        type:String,
        required: true
    },

    description:{             // description
        type:String,
        required: true
    },

    brand:{                    // brand
        type:String,
        // required: true
    },

    price:{                     // price
        type:Number,
        required: true
    },

    category:{                  // category
        type:String,
        required: true
    },

    stock:{                      // stock
        type:Number,
        required: true
    },

    rating:{                      // rating
        type:Number,
        // required: true
    },
    reviews:[{                    // reviews
        rating: {         
            type: Number,
            // required: true
        },
        comment: {       
            type: String,
            // required: true
        },
        date: {            
            type: Date,
            // required: true
        },
        reviewerName: {    
            type: String,
            // required: true
        },
        reviewerEmail: {  
            type: String,
            // required: true
        }
       
    }],
    productImage:{                  // images             
        type: [String],
        required: true
    },
},{timestamps:true})

module.exports = new mongoose.model("ProductData", productschema)