import React from 'react'

const ResetPassword = () => {
    const location = useLocation()
    const email = location.state?.email
    return (
        <div>
            ResetPassword
        </div>
    )
}

export default ResetPassword
