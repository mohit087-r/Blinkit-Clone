import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body

        if(!name || !image || !category[0]){
            return res.status(400).json({
                message : 'All fields are required',
                error : true,
                success : false
            })
        }

    

        const addSubCategory = new SubCategoryModel({
            name,
            image,
            category
        })
        const saveSubCategory = await addSubCategory.save()

        if(!saveSubCategory){
            return res.status(500).json({
                message : 'Internal server error',
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : "Sub-Category Added Successfully",
            data : saveSubCategory,
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

export const getSubCategoryController = async (req, res) => {
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1});

        if(!data){
            return res.status(500).json({
                message : 'Interval server error',
                error : true,
                success : false
            })
        }

        return res.status(200).json({
            message : 'Sub-category data',
            data : data,
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