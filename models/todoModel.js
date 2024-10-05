import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        description:{
            type:String
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    },
    {timestamps:true}
);

const TODO_SCHEMA = mongoose.model("todos",todoSchema);

export {TODO_SCHEMA};