import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, placeholder, label, type}) => {
    const [showPassword, setPassword] = useState(false);

    const toggleShowPassword = () => {
        setPassword(!showPassword);
    }

    return (
        <div className='group'>
        <label htmlFor={label} className='text-slate-800'>{label} :</label>
        <div className='w-full flex justify-between gap-3 focus-within:border-amber-300 focus-within:bg-amber-50 text-black bg-blue-50 rounded px-4 py-3 mb-4 border border-slate-200 outline-none'>
            <input 
                type={type == 'password' ? showPassword ? 'text' : 'password' : type}
                placeholder={placeholder}
                className='w-full outline-none'
                value={value}
                id={label}
                autoFocus={label == 'Name' ? true : false}
                onChange={(e) => onChange(e)}
            />

            {type === 'password' && (
                <>
                    {showPassword ? (
                        <FaRegEye
                            size={22}
                            className='text--200 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
        </div>
        </div>
    )
}

export default Input