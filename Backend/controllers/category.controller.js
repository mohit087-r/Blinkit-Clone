import CategoryModel from "../models/category.model.js"


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
        const data = await CategoryModel.find()

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