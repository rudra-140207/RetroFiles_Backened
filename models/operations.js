import mongoose from "mongoose";

const operationSchema = mongoose.Schema({
    token : String,
    editRemain : {
        type : Boolean,
        default : true
    },
    deleteRemain : {
        type : Boolean,
        default : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60,
    },    
})

const operationModel = new mongoose.model("operation" , operationSchema);

export default operationModel ;