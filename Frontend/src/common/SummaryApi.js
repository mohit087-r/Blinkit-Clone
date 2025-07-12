export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login: {
        url: '/api/user/login',
        method: 'post'
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'put'
    },
    verify_otp: {
        url: '/api/user/verify-otp',
        method: 'put'
    },
    reset_password : {
        url : '/api/user/reset-password',
        method : 'put'
    },
    refresh_token : {
        url : '/api/user/refresh-token',
        method : 'post'
    },
    user_details : {
        url : '/api/user/user-details',
        method : 'get'
    },
    logout : {
        url : '/api/user/logout',
        method : 'get'
    },
    upload_avatar : {
        url: '/api/user/upload-avatar',
        method : 'put'
    },
    update_user_details : {
        url : '/api/user/update-user',
        method : 'put'
    },
    add_category : {
        url : '/api/category/add',
        method : 'post'
    },
    upload_image : {
        url : '/api/file/upload',
        method : 'post'
    },
    get_categories : {
        url : '/api/category/get',
        method : 'get'
    },
    update_category : {
        url : '/api/category/update',
        method : 'put'
    },
    remove_category : {
        url : '/api/category/remove',
        method : 'delete'
    },
    add_sub_category : {
        url : '/api/sub-category/add',
        method : 'post'
    },
    get_sub_categories : {
        url : '/api/sub-category/get',
        method : 'post'
    }
}

export default SummaryApi