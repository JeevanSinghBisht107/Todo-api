import asyncHandler from 'express-async-handler';
import { TODO_SCHEMA } from '../models/todoModel.js';

const addtodo = asyncHandler(async(req,res) => {
    let { description } = req.body;
    let newtodo = await TODO_SCHEMA.create({
        description,createdBy:req.myUser._id
    });
    res.status(201).json({message:"Todo added successfully",newtodo});
});

const fetchAlltodo = asyncHandler(async(req,res) => {
    let findAlltodo = await TODO_SCHEMA.find({createdBy:req.myUser._id});
    res.status(200).json({message:"All todo's fetched", findAlltodo});
});

const updatetodo = asyncHandler(async(req,res) => {
    let { id } = req.params;
    let findtodo = await TODO_SCHEMA.findById(id);
    if(!findtodo){
        throw new Error("No such todo exists");
    }
    let updatedtodo = await TODO_SCHEMA.findByIdAndUpdate(id,req.body,{new:true}); 
    res.status(200).json({message:"todo updated successfully",updatedtodo});
});

const deletetodo = asyncHandler(async(req,res) => {
    let { id } = req.params;
    let findtodo = await TODO_SCHEMA.findById(id);
    if(!findtodo){
        throw new Error("No such todo exists..");
    }
    await TODO_SCHEMA.findByIdAndDelete(id);
    res.status(200).json({ message:"Deleted todo Successfully" })
});

export { addtodo, fetchAlltodo,updatetodo,deletetodo};