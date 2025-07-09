import { error } from "console"
import CategoryModel from "../models/category.model.js"
import ProductModel from "../models/product.model.js"
import SubCategoryModel from "../models/subCategory.model.js"


export const AddCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body

        if(!name || !image){
            return res.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return res.status(500).json({
                message : "Interval server error",
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : "Category Added Successfully",
            data : saveCategory,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return res.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message | error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { categoryId, name, image } = req.body

        if(!categoryId, !name, !image){
            return res.status(400).json({
                message : "All fields required",
                error : true,
                success : false
            })
        }

        const update = await CategoryModel.updateOne({
            _id : categoryId
        },{
            name : name,
            image : image
        })

        if(!update){
            return res.status(500).json({
                message : "Interval server error",
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : "Updated successfully",
            data : update,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.body

        if(!categoryId){
            return res.status(400).json({
                message : 'category id required',
                error : true,
                success : false
            })
        }

        const checkSubCategory = await SubCategoryModel.find({
            category : {
                '$in' : [ categoryId ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category : {
                '$in' : [ categoryId ]
            }
        }).countDocuments()

        if(checkSubCategory > 0 || checkProduct > 0){
            return res.status(400).json({
                message : "Category is already use can't delete",
                error : true,
                success : false
            })
        }

        const remove = await CategoryModel.findByIdAndDelete(categoryId)

        if(!remove){
            return res.status(500).json({
                message : 'Interval server error',
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : 'Deleted successfully',
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}