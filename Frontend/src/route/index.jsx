import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import Dashbaord from "../layouts/Dashbaord";
import Profile from "../pages/Profile";
import MyOrder from "../componets/MyOrder";
import Address from "../componets/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import ProtectedRoute from "../layouts/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'verify-otp',
                element: <VerifyOtp />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path: 'dashboard',
                element: <Dashbaord />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'myorders',
                        element: <MyOrder />
                    },
                    {
                        path: 'address',
                        element: <Address />
                    },
                    {
                        path: 'product',
                        element: (
                            <ProtectedRoute>
                                <ProductAdmin />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'category',
                        element: (
                            <ProtectedRoute>
                                <CategoryPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'sub-category',
                        element: (
                            <ProtectedRoute>
                                <SubCategoryPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'upload-product',
                        element: (
                            <ProtectedRoute>
                                <UploadProduct />
                            </ProtectedRoute>
                        )
                    }
                ]
            }
        ]
    }
])

export default router