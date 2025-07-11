import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddSubCategoryController, getSubCategoryController } from '../controllers/subCategory.controller.js'
const subCategoryRouter = Router()

subCategoryRouter.post('/add', auth, AddSubCategoryController)
subCategoryRouter.post('/get', getSubCategoryController)


export default subCategoryRouter